
/**
*   имеется некий  
*/


interface curvePoint{


}

const dimension : number = 100;
    
const data = [ 
    [50,10,104,10,104,90,50,90],
    [50,90,-4,90,-4,10,50,10],
    [50,10,50,10,50,14,50,14],
    [50,14,98,14,98,86,50,86],
    [50,86,2,86,2,14,50,14],
    [60,40,60,40,60,78,60,78],
    [60,78,60,78,40,78,40,78],
    [40,78,40,78,40,50,40,50],
    [40,50,40,50,34,50,34,50],
    [34,50,34,50,34,40,34,40],
    [34,40,34,40,60,40,60,40],
    [50,18,64,18,64,38,50,38],
    [50,38,36,38,36,18,50,18]
];

const scale = (p:number, len:number, sourseLen:number = 100 ) => len*p/sourseLen

export class Size{
    constructor(public width:number, public height:number){
    }
}
export class Point{
    constructor(public x:number, public y:number){
    }
}

export class DrGraph{
    constructor( 
        private context:CanvasRenderingContext2D,
        private size:Size,
        private baseSize:Size = { width:100,height:100 } 
    ){}

    tx = (p:number) => scale(p,this.size.width,this.baseSize.width);
    ty = (p:number) => scale(p,this.size.height,this.baseSize.height);

    beginPath        = () => this.context.beginPath();
    moveTo           = (x:number, y: number) => this.context.moveTo( this.tx(x), this.ty(y) );      
    bezierCurveTo    = (cp1x:number,cp1y:number,cp2x:number,cp2y:number,x:number, y: number) => 
        this.context.bezierCurveTo(this.tx(cp1x), this.ty(cp1y),this.tx(cp2x), this.ty(cp2y),this.tx(x), this.ty(y) ) ;
    quadraticCurveTo = (cpx:number,cpy:number,x:number, y: number) => this.context.quadraticCurveTo(this.tx(cpx), this.ty(cpy),this.tx(x), this.ty(y));        
    stroke           = () => this.context.stroke();
    
}
 
const DrDraw = (data : number[][] ,context:CanvasRenderingContext2D, size:Size = { width:200,height:200 } ) =>{
    var gr = new DrGraph(context, size);
    const dr2 = ( a:Point, x:number[] ) =>{
        const move  = (x1,y1) => {gr.beginPath();  gr.moveTo(x1, y1); }
        const isCnt = a && (a.x != x[0] || a.y != x[1]);
        (isCnt)? gr.stroke():null;
        (isCnt)||!a ? move(x[0], x[1] ):null;
        gr.bezierCurveTo(x[2],x[3],x[4],x[5],x[6],x[7]);
        return new Point(x[6],x[7])
    }    
    data.reduce( dr2 , undefined );

    gr.stroke();
}

export const DrDrawTest = (context:CanvasRenderingContext2D ) => DrDraw( data , context);

//const i:GrIcon = 


/**
 * 
 */

/**
 * Common immanent graph class 
 */
export class immanentIcon{
    constructor( 
        private pathPrim:number[][],
        private pathAlt: number[][]=undefined,
        private size:Size = { width:32,height:32} 
    ){}
    private preDrawCommon(){}
    private postDrawCommon(){}
    private draw(){} 
}





