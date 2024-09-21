import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dtos/create-report.dto';
import { Report } from './reports.entity';
import { User } from 'src/users/users.entity';
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


}
