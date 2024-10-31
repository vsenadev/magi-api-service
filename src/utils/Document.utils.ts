import { Injectable } from '@nestjs/common';
import * as PDFDocument from 'pdfkit';

@Injectable()
export class Document {
  constructor() {}

  async generatePdf(
    title: string,
    sender: string,
    recipient: string,
    startingStreet: string,
    startingNumber: number,
    startingNeighborhood: string,
    startingCity: string,
    startingState: string,
    startingCep: string,
    destinationStreet: string,
    destinationNumber: number,
    destinationNeighborhood: string,
    destinationCity: string,
    destinationState: string,
    destinationCep: string,
    mapsQrCode: any,
    routeAuthentication: any,
  ): Promise<string> {
    const doc = new PDFDocument({
      info: {
        Title: title,
      },
    });

    const imageWidth = 200;
    const firstImageX = 100;
    const secondImageX = firstImageX + imageWidth + 10;
    const imageY = 350; // Posição Y onde as imagens serão inseridas
    const titleOffsetY = 30; // Offset para o título acima da imagem
    const buffers: Buffer[] = [];

    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', () => {});

    // Título e informações principais
    doc.fontSize(20).text(`Entrega de ${title}`, { align: 'center' });
    doc.moveDown();
    doc.fontSize(12).text(`Remetente: ${sender}`, { align: 'left' });
    doc.moveDown();
    doc.fontSize(12).text(`Destinatário: ${recipient}`, { align: 'left' });
    doc.moveDown();
    doc
      .fontSize(12)
      .text(
        `Saída: ${startingStreet}, ${startingNumber} - ${startingNeighborhood} / ${startingCep}, ${startingCity} - ${startingState}`,
        { align: 'left' },
      );
    doc.moveDown();
    doc
      .fontSize(12)
      .text(
        `Destino: ${destinationStreet}, ${destinationNumber} - ${destinationNeighborhood} / ${destinationCep}, ${destinationCity} - ${destinationState}`,
        { align: 'left' },
      );
    doc.moveDown();
    doc.moveDown();

    doc
      .fontSize(14)
      .text('VERIFICAR ROTA', firstImageX + 10, imageY - titleOffsetY);
    doc.image(mapsQrCode, firstImageX, imageY, {
      width: imageWidth,
      height: imageWidth,
    });

    doc
      .fontSize(14)
      .text('AUTENTICAR', secondImageX + 10, imageY - titleOffsetY);

    doc.image(routeAuthentication, secondImageX, imageY, {
      width: imageWidth,
      height: imageWidth,
    });

    doc.end();

    await new Promise<void>((resolve) => doc.on('end', resolve));

    const pdfBuffer = Buffer.concat(buffers);

    return pdfBuffer.toString('base64');
  }
}
