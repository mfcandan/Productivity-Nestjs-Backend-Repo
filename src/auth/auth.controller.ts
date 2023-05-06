import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(
    @Body('email') email: string,
    @Body('name') name: string,
    @Body('password') password: string,
  ): Promise<any> {
    const jwt = await this.authService.register(email, name, password);
    if (jwt) {
      return {
        success: true,
        message: 'Kullanıcı başarıyla kaydedildi.',
        ...jwt,
      };
    } else {
      return {
        success: false,
        message: 'Kullanıcı kaydı başarısız oldu. E-posta zaten kullanılıyor.',
      };
    }
  }

  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ): Promise<any> {
    const user = await this.authService.login(email, password);
    if (user) {
      return { success: true, message: 'Giriş başarılı.', user };
    } else {
      return {
        success: false,
        message: 'Giriş başarısız. E-posta veya şifre hatalı.',
      };
    }
  }
}
