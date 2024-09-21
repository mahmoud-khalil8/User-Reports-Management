import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dto';
import { ReportsService } from './reports.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { currentUser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/users.entity';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { ReportDto } from './dtos/reports.dto';
import { ApproveReportDto } from './dtos/approve-report.dto';
import { AdminGuard } from 'src/guards/admin.guard';
import { GetEstimateDto } from './dtos/get-estimate.dot';
@Controller('reports')
export class ReportsController {
    constructor(private reportsService: ReportsService) { }
    @Post()
    @UseGuards(AuthGuard)
    @Serialize(ReportDto)
    createReports(@Body() body: CreateReportDto, @currentUser() user: User) {
        return this.reportsService.create(body, user);
    }

    @Get()
    getEstimate(@Query() query: GetEstimateDto) {

    }



    @Patch('/:id')
    @UseGuards(AdminGuard)
    approveReport(@Param('id') id: string, @Body() body: ApproveReportDto) {
        // approve report
        return this.reportsService.changeApproval(id, body.approved);
    }

}