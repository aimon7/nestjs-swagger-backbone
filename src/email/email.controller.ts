import { Controller, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { EmailService } from './email.service';
import { hasRoles } from '../auth/decorator/roles.decorator';
import { UserRole } from '../user/models/user.interface';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

@Controller('email')
@ApiTags('Email')
export class EmailController {
    constructor(
        private readonly emailService: EmailService,
    ) {
    }

    @Post('/email-test-connection')
    @hasRoles(UserRole.SUPERADMIN, UserRole.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiBearerAuth()
    @ApiOperation({
        summary: 'Email testing',
        description: 'Verify connection configuration',
    })
    async verifyConnectionConfiguration(): Promise<string> {
        return await this.emailService.verifyEmailConnectionConfiguration();
    }

    @Post('/email-test-send/:email')
    @hasRoles(UserRole.SUPERADMIN, UserRole.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiBearerAuth()
    @ApiOperation({
        summary: 'Email testing',
        description: 'Verify send is done',
    })
    @ApiParam({name: 'email', type: String})
    async sendTestMail(@Param('email') email: string): Promise<string | void> {
        return await this.emailService.sendTestEmail(email);
    }
}
