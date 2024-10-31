import * as QRCode from 'qrcode';
import { Injectable } from '@nestjs/common';

@Injectable()
export class QrCode {
  constructor() {}

  async generateQrCode(link: string): Promise<Buffer> {
    return await QRCode.toBuffer(link, { errorCorrectionLevel: 'H' });
  }
}
