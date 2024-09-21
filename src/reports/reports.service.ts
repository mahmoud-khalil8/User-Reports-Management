import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dtos/create-report.dto';
import { Report } from './reports.entity';
import { User } from 'src/users/users.entity';
import { GetEstimateDto } from './dtos/get-estimate.dot';
@Injectable()
export class ReportsService {
    constructor(
        @InjectRepository(Report)
        private repo: Repository<Report>,
    ) { }
    create(reportDto: CreateReportDto, user: User) {
        const report = this.repo.create(reportDto);
        report.user = user;
        return this.repo.save(report);
    }
    async changeApproval(id: string, approved: boolean) {
        const reportId = parseInt(id, 10);
        if (isNaN(reportId)) {
            throw new NotFoundException('not found');
        }

        const report = await this.repo.findOne({ where: { id: reportId } });
        if (!report) {
            throw new NotFoundException('not found');
        }
        report.approved = approved;
        return this.repo.save(report);
    }
    createEstimate({ make, model, lng, lat, year, mileage }: any) {
        return this.repo.createQueryBuilder()
            .select('AVG(price)', 'price')
            .where('make= :make', { make })
            .andWhere('lng - :lng BETWEEN -5 AND 5', { lng })
            .andWhere('lat - :lat BETWEEN -5 AND 5', { lat })
            .andWhere('year - :year BETWEEN -3 AND 3', { year })
            .andWhere('mileage - :mileage BETWEEN -50000 AND 50000', { mileage })
            .andWhere('approved = true')
            .limit(3)
            .getRawOne();
    }


}
