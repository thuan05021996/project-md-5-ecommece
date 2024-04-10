import { Injectable } from '@nestjs/common';
import { CreateMailDto } from './dto/create-mail.dto';
import { UpdateMailDto } from './dto/update-mail.dto';
import { join } from 'path';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}
  async fogotpassword(createMailDto: any) {
    const {email} = createMailDto
    const pathTemplate = join(__dirname, '..', '..','teamplate', 'welcome.ejs')
    console.log(pathTemplate, 'pathTemplate')
    await this.mailerService.sendMail({
      to: email,
      subject: 'Lấy lại mật khẩu',
      template: pathTemplate,
      context: {
        name: createMailDto?.name,
        product: createMailDto?.product_name,
      }
    })
    return 'gui thanh cong';
  }
  }

  