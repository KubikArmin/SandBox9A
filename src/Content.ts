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
        //let x = 12;
        //x = 20;
        //res.write(`Az x változó értéke: ${x}\n`);
        //res.write(x.toString() + "\n");
        //const szöveg = "alma";
        //res.write(szöveg + "\n");
        //let esik: boolean;
        //esik = true;
        //esik = false;
        //res.write(`${esik}\n`);

        // res.write("Téglalap területe és kerülete\n");
        // res.write("a = ");
        // let oldalA: number = parseInt(params.inputa as string);
        // res.write(`<input type='number' name='inputa' value=${oldalA} style='width:5em;' onChange='this.form.submit();'>\n`);
        // if (isNaN(oldalA)) {
        //     oldalA = 20;
        // }

        // res.write("b = ");
        // let oldalB: number = parseInt(params.inputb as string);
        // res.write(`<input type='number' name='inputb' value=${oldalB} style='width:5em;' onChange='this.form.submit();'>\n`);
        // if (isNaN(oldalB)) {
        //     oldalB = 20;
        // }

        // const terület: number = oldalA * oldalB;
        // const kerület: number = 2 * (oldalA + oldalB);
        // res.write(`terület = ${terület}\n`);
        // res.write(`kerület = ${kerület}\n`);

        // res.write("alma");
        // res.write("\n,\n");

        // res.write("Páros vagy páratlan?\n");
        // res.write("x= ");
        // let x: number = parseInt(params.szam as string);
        // if (isNaN(x)) {
        //     x = 0;
        // }
        // res.write(`<input type='number' name='szam' value=${x} style='width:5em;' onChange='this.form.submit();'>\n`);
        // if (x % 2 == 0) {
        //     res.write("A szám páros!\n\n\n");
        // } else {
        //     res.write("A szám páratlan!\n\n");
        // }

        // res.write("Osztályozó\n");
        // res.write("Az osztályzat: ");
        // let jegy: number = parseInt(params.jegy as string);
        // if (isNaN(jegy)) {
        //     jegy = 5;
        // }
        // res.write(`<input type='number' name='jegy' value=${jegy} style='width:5em;' onChange='this.form.submit();'>\n`);
        // switch (jegy) {
        //     case 1:
        //         res.write("Elégtelen\n");
        //         break;
        //     case 2:
        //         res.write("Elégséges\n");
        //         break;
        //     case 3:
        //         res.write("Közepes\n");
        //         break;
        //     case 4:
        //         res.write("Jó\n");
        //         break;
        //     case 5:
        //         res.write("Jeles\n");
        //         break;
        //     default:
        //         res.write("Ez nem osztályzat!\n");
        //         break;
        // }

        res.write("Másodfokú egyenlet valós gyökei\n");
        res.write("Adja meg a, b és c értékét!\n");
        res.write("a= ");
        let a: number = parseInt(params.szam1 as string);
        if (isNaN(a)) {
            a = 1;
        }
        res.write(`<input type='number' name='szam1' value=${a} style='width:5em;' onChange='this.form.submit();'>\n`);

        res.write("b= ");
        let b: number = parseInt(params.szam2 as string);
        if (isNaN(b)) {
            b = 1;
        }
        res.write(`<input type='number' name='szam2' value=${b} style='width:5em;' onChange='this.form.submit();'>\n`);

        res.write("c= ");
        let c: number = parseInt(params.szam3 as string);
        if (isNaN(c)) {
            c = 1;
        }
        res.write(`<input type='number' name='szam3' value=${c} style='width:5em;' onChange='this.form.submit();'>\n`);

        if (a != 0) {
            res.write("1. igaz\n");
            if (Math.pow(b, 2) >= 4 * a * c) {
                res.write("2. igaz\n");
                if (Math.pow(b, 2) > 4 * a * c) {
                    res.write("Az egyenletnek két valós gyöke van\n");
                    const x1: number = (-b + Math.sqrt(Math.pow(b, 2) - 4 * a * c)) / (2 * a);
                    res.write(`x1 = ${x1}\n`);
                    const x2: number = (-b - Math.sqrt(Math.pow(b, 2) - 4 * a * c)) / (2 * a);
                    res.write(`x2 = ${x2}\n`);
                } else {
                    res.write("Az egyenletnek egy valós gyöke van\n");
                    const x: number = -((2 * b) / a);
                    res.write(`x = ${x}\n`);
                }
            } else {
                res.write("2. hamis\n");
                res.write("Az egyenletnek nincs valós gyöke\n");
            }
        } else {
            res.write("1. hamis\n");
            if (b != 0) {
                res.write("I. igaz");
                if (c != 0) {
                    res.write("II. igaz");
                    res.write("Azonosságra jutunk, minden valós x megoldás");
                } else {
                    res.write("II. hamis");
                    res.write("Ellentmondásra jutunk, az egyenletnek nincs megoldása");
                }
            } else {
                res.write("I. hamis");
                res.write("Az egyenletnek egy valós gyöke van\n");
                const x: number = -(c / b);
                res.write(`x = ${x}\n`);
            }
        }
        // <---- Fejezd be a kódolást

        res.write("</pre></form></body></html>");
        res.end();
    }
}
