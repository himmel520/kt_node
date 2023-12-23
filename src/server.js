const express = require("express");
const app = express();
const soap = require("soap");
const moment = require("moment");

const port = 3002;
const url = "https://www.cbr.ru/DailyInfoWebServ/DailyInfo.asmx?WSDL";

app.get("/getValutes", (req, res) => {
  soap.createClient(url, (err, client) => {
    if (err) {
      res.status(500).json({ error: "Error creating SOAP client" });
      return;
    }

    client.EnumValutesXML({ Seld: false }, (err, result) => {
      if (err) {
        res.status(500).json({ error: "Error calling EnumValutesXML" });
        return;
      }
      const enumValutes = result.EnumValutesXMLResult.ValuteData.EnumValutes;

      client.GetCursOnDateXML(
        { On_date: new Date().toISOString() },
        (err, result) => {
          if (err) {
            res.status(500).json({ error: "Error calling GetCursOnDateXML" });
            return;
          }
          const valutes =
            result.GetCursOnDateXMLResult.ValuteData.ValuteCursOnDate;

          const valutesJSON = enumValutes.map((enumValute) => {
            const matchingValute = valutes.find(
              (valute) => valute.VchCode === enumValute.VcharCode
            );

            return {
              code: enumValute.Vcode,
              name: enumValute.Vname,
              value: matchingValute ? parseFloat(matchingValute.Vcurs) : null,
            };
          });
          res.json(valutesJSON);
        }
      );
    });
  });
});

app.get("/getValute", (req, res) => {
  const { code, start_date, end_date } = req.query;
  soap.createClient(url, (err, client) => {
    if (err) {
      res.status(500).json({ error: "Error creating SOAP client" });
      return;
    }

    client.GetCursDynamicXML(
      {
        FromDate: start_date,
        ToDate: end_date,
        ValutaCode: code,
      },
      (err, result) => {
        if (err) {
          res.status(500).json({ error: "Error calling GetCursDynamicXML" });
          return;
        }

        const valuteDynamic =
          result.GetCursDynamicXMLResult.ValuteData.ValuteCursDynamic;

        const valuteDynamicJSON = valuteDynamic.map((entry) => ({
          date: moment(entry.CursDate).format("DD.MM.YYYY"),
          value: parseFloat(entry.Vcurs),
        }));

        res.json(valuteDynamicJSON);
      }
    );
  });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
