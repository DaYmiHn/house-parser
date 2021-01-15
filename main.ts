type ExpressionT = { 
  name: string, 
  value?: Array<string|number> 
}[]

export class HousesParser {
  constructor(private readonly source: string) {}
  
  private readonly maxCountHouses = 110;

  private filter(params:ExpressionT, houseNumber:string):boolean{
    // console.log(params)
    let arr:Array<number|string> = []
    params.forEach(el => {
      if(el.name == 'четные') arr = arr.concat(el.value.filter(x => <number>x % 2 === 0))
      if(el.name == 'нечетные') arr = arr.concat(el.value.filter(x => <number>x % 2 !== 0))
      if(el.name == 'range' || el.name == 'sequence') arr = arr.concat(el.value)
      if(el.name == 'toTheLast'){
        arr = arr.concat(this.toRange(`${Math.max.apply(null, arr)}-${this.maxCountHouses}`))
      } 
      if(el.name == 'litera') arr = arr.concat(el.value)
    });
    return arr.includes(+houseNumber) || arr.includes(houseNumber)
  }
  
  private toRange(str:string):number[]{
    let arrRange:string[] = str.split(str.match(/[^0-9]/g)[0])
    if(!arrRange[0])
      [arrRange[0], arrRange[1]] = [arrRange[1], arrRange[0]];
    return Array<number>((+arrRange[1]||this.maxCountHouses)-+arrRange[0]+1).fill(+arrRange[0]).map((x, y) => x + y)        
  }

  isHouseIncluded(houseNumber: string): boolean {
    let expression:ExpressionT = [];

    const evenOrOddMatches:string[] = this.source.match(/(не)?четные ?(с|от|.|) ?(\d{1,3}[-| |]\d{1,3}|\d{1,3}\+|\d{1,3})/gi);
    evenOrOddMatches && evenOrOddMatches.forEach(el=>{
      const range = el.match(/(\d{1,3}[-| |]\d{1,3}|\d{1,3}\+|(с|от) ?\d{1,3}|\d{1,3})/gi)
      expression.push({name: el.match(/(четные|нечетные)/gi)[0], value: this.toRange(range[0])})
    });

    const range:string[] = this.source.match(/(?<!четные(?:.{1,6})?)\d{0,3}-\d{0,3}/gi)
    range && range.forEach(el=>expression.push({name: "range", value: this.toRange(el)}))
    
    !evenOrOddMatches && expression.push({name: "sequence", value: this.source.split(',').map(el=> !isNaN(+el) && +el.trim()).filter(n => n)})
    
    const toTheLast:string[] = this.source.match(/и вся улица до конца/gi)
    toTheLast && expression.push({name: "toTheLast"})

    const litera:string[] = this.source.match(/(\d{1,3}\/\d{1,3}|\d{1,3}[а-я])/gi)
    litera && expression.push({name: "litera", value: litera})
    
    const numbers:string[] = this.source.match(/[,| ]\d{1,3}(?=,| )/gi)
    numbers && expression.push({name: "numbers", value: numbers.map(el=>+el.replace(',','').trim())})
    
    return this.filter(expression, houseNumber)
  }
}

// new HousesParser('7/1нечетные с 21 11,17 17/1,17/2,8/2,15,15/1,15-17,15ачетные 42+').isHouseIncluded('42')