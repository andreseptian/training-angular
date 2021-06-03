import {FlexGrid,Row,CellType,CellRange} from "@grapecity/wijmo.grid";
// import * as wjcCore from "wijmo/wijmo";
import {setCss} from "@grapecity/wijmo";
import { CustomMergeManager } from "./CustomMergeManager";

export class ColumnGroupProvider{

  _grid:FlexGrid;
  _groups:any[];
  _selectOnClick:boolean;

  get selectOnClick():boolean{
    return this._selectOnClick;
  }
  set selectOnClick(value:boolean){
    this._selectOnClick = (!!value);
  }

  constructor(grid:FlexGrid,colGroups:any[]){
    this._grid=grid;
    this._groups=colGroups;
    this.initCols(grid,colGroups);
    this.attachListeners(grid);
  }

  refreshHeaders(groups:any[]){
    if(!groups){
      return;
    }
    this._groups=groups;
    this.initCols(this._grid,groups);
  }

  attachListeners(grid){
    grid.formatItem.addHandler((s,e)=>{
      if(e.panel.cellType==CellType.ColumnHeader){
        //align in center horizontally and vertically
        setCss(e.cell, {
                        display: 'table',
                        tableLayout: 'fixed',
                        // paddingTop: '0px',
                        // paddingBottom: '0px'
                    });
        e.cell.innerHTML = '<div>' + e.cell.innerHTML + '</div>';
        setCss(e.cell.children[0], {
          display: 'table-cell',
          verticalAlign: 'middle',
          textAlign: 'center'
        });


      }
    });

    grid.mergeManager= new CustomMergeManager(grid);

    grid.hostElement.addEventListener('click',(e)=>{
      if (this._selectOnClick) {
        var ht = grid.hitTest(e);
        if (ht.panel == grid.columnHeaders) {
          var rng = grid.getMergedRange(grid.columnHeaders, ht.row, ht.col, false) || ht.range;
          grid.select(new CellRange(0, rng.col, grid.rows.length - 1, rng.col2));
          e.preventDefault();
        }
      }
    });

    // prevent sort/drag when selectOnClick is true
    grid.sortingColumn.addHandler((s, e) => {
      if (this._selectOnClick) {
        e.cancel = true;
      }
    });
    grid.draggingColumn.addHandler((s, e) => {
      if (this._selectOnClick) {
        e.cancel = true;
      }
    });
  }

  initCols(grid:FlexGrid,groups:any[]){
    var rows=this.getRowsData(groups);
    grid.columnHeaders.rows.clear();
    while(grid.columnHeaders.rows.length<rows.length){
      grid.columnHeaders.rows.splice(0,0,new Row());
    }
    rows.forEach((row,index)=>{
      grid.columnHeaders.rows[index].dataItem=row;
      grid.columnHeaders.rows[index].allowMerging=true;
    });
    grid.columnHeaders.columns.forEach(col=>{
      col.allowMerging=true;
    });
  }

  getRowsData(colHeaders){
    var rows=[];

    colHeaders.forEach(colh=>{
      this.fillRows(0,"",rows,colh);
    });

    for(let i=1;i<rows.length;i++){
      rows[i]=this.mergeDeep(rows[i-1],rows[i]);
    }
     return rows;
  }

  fillRows(level,pHeaders,rows,curCol){
    if(level>=rows.length){
      rows.push({});
    }

    let curHeader=curCol['header'];
    if(!curHeader){
      curHeader=' ';
    }
    if(curCol['columns']){
      let cols=curCol['columns'];
      cols.forEach(col=>{
        this.fillRows(level+1,curHeader+","+pHeaders,rows,col);
      });
    }else if(curCol['binding']){
      this.assignBindingValue(rows[level],curCol['binding'],curHeader);
      let pH=pHeaders.split(',');
      pH.forEach((header,index)=>{
        if(!header){
          return;
        }
        this.assignBindingValue(rows[level-1-index],curCol['binding'],header);
      });
    }
  }

  assignBindingValue(item,binding,value){
    let path=binding;
    let parts=path.split('.');
    let temp=item;
    for(let i = 0; i<parts.length;i++){
      let part = parts[i],
          index=part.indexOf('[');
      if(index > -1){
        let _part=part.substr(0,index);
        if(temp[_part]===undefined){
          temp[_part]=[];
        }
        let curI=parseInt(part.substr(index+1));
        if(i==parts.length-1){
          temp[_part][i]=value;
        }else if(temp[_part][curI]){
          temp=temp[_part][curI];
        }else if(parts[i+1].indexOf('[')>0){
          temp[_part][curI]=[];
          temp=temp[_part][curI];
        }else{
          temp[_part][curI]={};
          temp=temp[_part][curI];
        }
      }else{
        if(i==parts.length-1){
          temp[part]=value;
        }else {
          if(temp[part]===undefined){
            temp[part]={};
          }
          temp=temp[part];
        }
      }
    }
  }

  isObject(item) {
    return (item && typeof item === 'object' && !Array.isArray(item));
  }

  mergeDeep(target, source) {
    let output = Object.assign({}, target);
    if (this.isObject(target) && this.isObject(source)) {
      Object.keys(source).forEach(key => {
        if (this.isObject(source[key])) {
          if (!(key in target))
            Object.assign(output, { [key]: source[key] });
          else
            output[key] = this.mergeDeep(target[key], source[key]);
        } else {
          Object.assign(output, { [key]: source[key] });
        }
      });
    }
    return output;
  }


}