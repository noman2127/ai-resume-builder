declare module 'html2pdf.js' {
  interface Html2PdfOptions {
    margin?: number | number[];
    filename?: string;
    image?: { type?: string; quality?: number };
    /* eslint-disable @typescript-eslint/no-explicit-any */
    html2canvas?: { scale?: number; useCORS?: boolean; [key: string]: any };
    jsPDF?: { unit?: string; format?: string | number[]; orientation?: 'portrait' | 'landscape' };
    [key: string]: any;
  }

  interface Html2PdfInstance {
    set(options: Html2PdfOptions): Html2PdfInstance;
    from(element: HTMLElement | string | any): Html2PdfInstance;
    save(): Promise<any>;
    toPdf(): Html2PdfInstance;
    output(type: string, options?: any): Promise<any>;
    /* eslint-enable @typescript-eslint/no-explicit-any */
  }

  interface Html2PdfFactory {
    (): Html2PdfInstance;
  }

  const html2pdf: Html2PdfFactory;
  export = html2pdf;
}
