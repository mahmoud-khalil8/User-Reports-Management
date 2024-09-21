import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dto';
import { ReportsService } from './reports.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { currentUser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/users.entity';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { ReportDto } from './dtos/reports.dto';

@Controller('reports')
export class ReportsController {
    constructor(private reportsService: ReportsService) { }
    @Post()
    @UseGuards(AuthGuard)
    @Serialize(ReportDto)
    createReports(@Body() body: CreateReportDto, @currentUser() user: User) {
        return this.reportsService.create(body, user);
    }
}