import fs from "fs";
import http from "http";
import url from "url";

export default class Content {
    public content(req: http.IncomingMessage, res: http.ServerResponse): void {
        // favicon.ico kérés kiszolgálása:
        if (req.url === "/favicon.ico") {
            res.writeHead(200, { "Content-Type": "image/x-icon" });
            fs.createReadStream("favicon.ico").pipe(res);
            return;
        }
        // Weboldal inicializálása + head rész:
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.write("<!DOCTYPE html>");
        res.write("<html lang='hu'>");
        res.write("<head>");
        res.write("<style>input, pre {font-family:monospace; font-size:1em; font-weight:bold;}</style>");
        res.write("<meta name='viewport' content='width=device-width, initial-scale=1.0'>");
        res.write("<title>Sandbox 9A</title>");
        res.write("</head>");
        res.write("<body><form><pre>");
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const params = url.parse(req.url as string, true).query;

        // Kezd a kódolást innen -->

        res.write("Legnagyobb közös osztó meghatározása kivonásos módszerrel\n");
        res.write("a = ");
        let a: number = parseInt(params.A as string);
        res.write(`<input type='number' name='A' value=${a} style='width:5em;' onChange='this.form.submit();'>\n`);
        if (isNaN(a)) {
            a = 1;
        }

        res.write("b = ");
        let b: number = parseInt(params.B as string);
        res.write(`<input type='number' name='B' value=${b} style='width:5em;' onChange='this.form.submit();'>\n`);
        if (isNaN(b)) {
            b = 1;
        }

        while (a != b) {
            if (a > b) {
                a = a - b;
            } else {
                b = b - a;
            }
        }
        res.write(`\nA két szám legnagyobb közös osztója: ${a}\n`);

        res.write("\nLegnagyobb kösöz osztó meghatározása Euklidesz-módszerrel\n");
        res.write("x= ");
        let x: number = parseInt(params.X as string);
        res.write(`<input type='number' name='X' value=${x} style='width:5em;' onChange='this.form.submit();'>\n`);

        res.write("y= ");
        let y: number = parseInt(params.Y as string);
        res.write(`<input type='number' name='Y' value=${y} style='width:5em;' onChange='this.form.submit();'>\n`);
        let m: number = a % b;
        do {
            m = x % y;
            x = y;
            y = m;
        } while (m != 0);
        res.write(`A két szám legnagyobb közös osztója: ${x}`);
        res.write("Hello WOrld!");
        // <---- Fejezd be a kódolást

        res.write("</pre></form></body></html>");
        res.end();
    }
}
