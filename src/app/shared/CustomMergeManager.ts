import { MergeManager, CellRange, CellType  } from "@grapecity/wijmo.grid";

export class CustomMergeManager extends MergeManager{
  
  constructor(grid){
    super(grid);
  }

  getMergedRange(panel,r,c,clip){
    //return default if cell type is not column header
    if(panel.cellType!=CellType.ColumnHeader){
      return super.getMergedRange(panel,r,c,clip);;
    }

    if (clip === void 0) { clip = true; }
    // create basic cell range
    var rg = new CellRange(r, c);
    // expand left/right
    for (var i = rg.col; i < panel.columns.length - 1; i++) {
      if (panel.getCellData(rg.row, i, true) != panel.getCellData(rg.row, i + 1, true))
        break;

      //check if frozen columns active and needs to break merging
      if(panel.grid.frozenColumns&&rg.col<panel.grid.frozenColumns&&((i+1)>=panel.grid.frozenColumns))
        break;

      // check if ancestors combine
      let flag=true;
      for(let j=0; j<rg.row&&flag; j++){
        if(panel.getCellData(j, i, true)!= panel.getCellData(j,i+1,true)){
          flag=false;
        }
      }
      if(!flag){
        break;
      }

      rg.col2 = i + 1;
                   
    }
    for (var i = rg.col; i > 0; i--) {
      if (panel.getCellData(rg.row, i, true) != panel.getCellData(rg.row, i - 1, true))
        break;
                    
      //check if frozen columns active and needs to break merging
      if(panel.grid.frozenColumns&&rg.col>=panel.grid.frozenColumns&&((i-1)<panel.grid.frozenColumns))
        break;

      // check if ancestors combine
      let flag=true;
      for(let j=0; j<rg.row&&flag; j++){
        if(panel.getCellData(j, i, true)!= panel.getCellData(j,i-1,true)){
          flag=false;
        }
      }
      if(!flag){
        break;
      }
      
      rg.col = i - 1;
    }
    // expand up/down
    for (var i = rg.row; i < panel.rows.length - 1; i++) {
      if (panel.getCellData(i, rg.col, true) != panel.getCellData(i + 1, rg.col, true))
        break;
      //check if frozen rows active and needs to break merging
      if(panel.grid.frozenRows&&rg.row<panel.grid.frozenRows&&((i+1)>=panel.grid.frozenRows))
        break;
      rg.row2 = i + 1;
    }
    for (var i = rg.row; i > 0; i--) {
      if (panel.getCellData(i, rg.col, true) != panel.getCellData(i - 1, rg.col, true))
        break;
      //check if frozen rows active and needs to break merging
      if(panel.grid.frozenRows&&rg.row>=panel.grid.frozenRows&&((i-1)<panel.grid.frozenRows))
        break;
      rg.row = i - 1;
    }
    // done
    return rg;

  }
}