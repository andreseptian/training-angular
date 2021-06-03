import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class ConvertCsvService {

  hasilCsv: any = [];

  constructor() { }

  setDataCSV(event) {

    var reader = new FileReader();
    reader.readAsText(event.target.files[0]);

    reader.onload = (data) => {
      this.hasilCsv = this.convertCsvToData(reader.result);
    }
  }

  getDataCsv(): any {
    return this.hasilCsv;
  }

  convertCsvToData(csv): any {
    var lines = csv.split(/\r\n|\n/);
    var result = [];
    var flagCekDelimit = false;

    for (var i = 1; i < lines.length; i++) {
      var obj = [];

      if (lines[i].includes("|") == true) {
        var currentline = lines[i].split("|");

        for (var j = 0; j < currentline.length; j++) {
          let dataKolom = currentline[j];
          if (dataKolom == "" || dataKolom == null) {
            dataKolom = null;
          }
          obj[j] = dataKolom;
        }
        result.push(obj);
      }else{
        flagCekDelimit = true;
      }
    }

    // Cek Delimit
    if(flagCekDelimit == true){
      result = [];
      result.push({'errDelimit':true});
    }

    return result;
  }
}
