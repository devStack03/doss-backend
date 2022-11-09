import {
  Body,
  Controller,
  Post,
  Get,
  UseGuards,
  Request,
  Param,
  HttpCode,
  BadRequestException,
  Res,
  HttpStatus,
  Logger,
  Req,
  Headers,
} from "@nestjs/common";
import { ApiTags, ApiResponse, ApiBearerAuth, ApiBody, ApiOperation } from "@nestjs/swagger";

import { AuthService } from "./auth.service";
import JwtRefreshGuard from './jwt-refresh.guard';
import { LocalAuthGuard } from "./local-auth.guard";
import {
  CredentialsDTO,
  EmailDTO,
  LoginResponseDTO,
  RefreshTokenDTO,
  SendLoginCodeDto,
  SignupResponseDTO
} from './dto/auth.dto';
import { GeneralResponseDTO } from "../shared/dto/general.response.dto";
import { JwtAuthGuard } from "./jwt-auth.guard";
import { ErrorResponseDTO } from "../shared/dto";
import { UserSignupDTO } from "../users/dto/create-user.dto";


@ApiTags("Auth")
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    // private emailConfirmationService: EmailConfirmationService
  ) {

  }
  @Post('/register')
  @ApiOperation({
    summary: "User register endpoint.",
    description: "User signup with email, password."
  })
  @ApiResponse({ status: 200, type: SignupResponseDTO, description: "Verify your email" })
  @ApiResponse({ status: 400, type: ErrorResponseDTO, description: "Validation error" })
  async register(@Body() user: UserSignupDTO, @Req() req) {
    try {
      const _user = await this.authService.create(user);
      // await this.emailConfirmationService.sendVerificationLink(user.email, header.host);

      return { status: 1, message: 'Verify your email.', id: _user.id };
    } catch (error) {
      return { status: -1, error: error };
    }
  }

  @Post('/login')
  @ApiOperation({
    summary: "User login endpoint.",
    description: "User login with phonenumber, code."
  })
  @ApiResponse({ status: 201, type: LoginResponseDTO, description: "User logged and JWT returned." })
  @ApiResponse({ status: 400, type: ErrorResponseDTO, description: "Validation error" })
  async login(@Body() userLoginDto: CredentialsDTO) {
    console.log(userLoginDto);
    return this.authService.login(userLoginDto);
  }

  @ApiBearerAuth('access-token')
  @UseGuards(JwtRefreshGuard)
  @Get('/refresh')
  @ApiOperation({
    summary: "Refresh token endpoint.",
    description: "Getting a new access token when the access token has been terminated. Attach the previous refresh_token value into Bearer header."
  })
  @ApiResponse({ status: 201, type: RefreshTokenDTO, description: "New access_token, refresh_token are returned." })
  @ApiResponse({ status: 400, type: ErrorResponseDTO, description: "Validation error" })
  async refresh(@Req() req: any) {
    return this.authService.refreshTokens(req.user.sub, req.user.refreshToken);
  }

  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Post('/logout')
  @ApiOperation({
    summary: "Logout endpoint.",
    description: "User logout api. Access token is required."
  })
  @ApiResponse({ status: 201, type: GeneralResponseDTO, description: "New access_token, refresh_token are returned." })
  @ApiResponse({ status: 400, type: ErrorResponseDTO, description: "Validation error" })
  async logout(@Req() req: any) {
    Logger.log(req.user.id);
    const user = await this.authService.logout(req.user.id);
    if (!user) throw new BadRequestException('Bad request')
    return { msg: 'Signed out successfully', status: 1 }
  }

  @ApiBody({ type: EmailDTO })
  @Post('/check-email')
  @ApiOperation({
    summary: "Check user email endpoint.",
    description: "Check user email whether it has been already verified or not."
  })
  @ApiResponse({ status: 201, type: GeneralResponseDTO, description: "Email verified or not." })
  @ApiResponse({ status: 400, type: ErrorResponseDTO, description: "Validation error" })
  async checkEmail(@Request() req: any, @Body() body: EmailDTO) {
    return this.authService.checkEmail(body.email);
  }

  @Post('/send_login_code')
  @ApiOperation({
    summary: "Send SMS for phone number login"
  })
  async sendCode(@Body() codeDto: SendLoginCodeDto, @Req() req: any) {
    // const userId = req.user.id;
    return this.authService.sendLoginCode(codeDto);
  }

}
