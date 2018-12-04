/**
 *  Canvas graph tool
 *  031218    
 */

/**
 * 2D - point
 */
interface Point{
    x:number
    y:number
}

const PointEq = (a:Point, b:Point ) => a.x==b.x && a.y == b.y  

/**
 * 2D - Size
 */
interface Size{
    width:number
    height:number
}

/**
 * Point of beze 
 */
interface CruvePoint{
    begin:Point
    p1:Point
    p2:Point
    end:Point
}

export enum GrAction {  Stroke, Fill, Clear }
export type grStyles = string|string[]

/*
*  Graph primitive by  
*/
interface GrAthom{
    path:CruvePoint[],
    color:grStyles,
    action:GrAction,
}

interface GrIcon{
    athoms:GrAthom[]
}

/**
 *  Legasy converters
 */
const valOrZero = ( p:number[], index:number ) => index < p.length  ? p[index] : 0 ;
const indToPoint = ( p:number[], begIndex:number ):Point => ({x:valOrZero(p,begIndex),y:valOrZero(p,begIndex+1)}) ;
const legasyToCruvePoint = (p:number[]) => ({ begin:indToPoint(p,0), p1:indToPoint(p,2), p2:indToPoint(p,4), end:indToPoint(p,6) })  ;
const legasyToCruvePath = (lPath:number[][]):CruvePoint[] => lPath.map( x =>  legasyToCruvePoint(x) )

/**
*  Legasy string converters
*/
const legasyStrToCruvePath = (lPath:string):CruvePoint[] => {
    const getPoint = (s:string) => { 
        const e = s.indexOf('}'); 
        const b = e > 0 ? s.substr(0,e).lastIndexOf('{') : e ;
        return (e<=0 || b<=0) ? 
            { pnt:undefined, rst:s } :
            { pnt:s.substring(b+1,e), rst: s.substring(e+1)}
    }    

    const next = ( source:string, ret:CruvePoint[] ) =>{
        const parse = (s:string) => {             
            const sa =  s.split(',');
            const pr = (st:string[],i) => st.length > i ? (+st[i]):0
            return { 
                begin: { x: pr(sa,0) , y: pr(sa,1) }, 
                p1: { x: pr(sa,2) , y: pr(sa,3) }, 
                p2: { x: pr(sa,4) , y: pr(sa,5) }, 
                end: { x: pr(sa,6) , y: pr(sa,7) } 
            }
        }
        const p = getPoint(source);
        //console.log(p);
        return p.pnt == undefined ? ret : next( p.rst, [...ret, parse(p.pnt)]  )
    }        
    return next(lPath,[]); 
}


/**
*  Transformation
*/
const baseScale = (p:number, len:number, sourseLen:number = 100 ) => len*p/sourseLen 
const baseScalePoint = (p:Point, size:Size, sourseLen:number = 100 ):Point => ({x:baseScale(p.x,size.width,sourseLen), y:baseScale(p.y,size.height,sourseLen)})
const CruvePointToSize = (cp:CruvePoint, size: Size):CruvePoint => ({ 
    begin:baseScalePoint(cp.begin,size),
    p1:baseScalePoint(cp.p1,size),
    p2:baseScalePoint(cp.p2,size),
    end:baseScalePoint(cp.end,size), 
})
const AthomAsSize = ( icon:GrAthom, size: Size) => ({...icon, path:icon.path.map(x => CruvePointToSize(x,size))})
const IconAsSize  = ( icon:GrIcon, size: Size)  => ({...icon, athoms: icon.athoms.map(x =>AthomAsSize(x, size)) })

const splitCruvePoint = (icon:CruvePoint[]):CruvePoint[][] => {
    const splitStep =( acc: { ret: CruvePoint[][] , cur:CruvePoint[] }, i:CruvePoint ) =>
        acc.cur.length > 0 && ! PointEq( acc.cur[acc.cur.length-1].end , i.begin  )?
                     { ret:[...acc.ret, [ ...acc.cur]], cur:[i] }:
                     { ret: acc.ret, cur:[...acc.cur, i] } ;
    const r = icon.reduce( splitStep , {ret:[], cur:[]});  
    return [...r.ret, r.cur];
}


const drawAthom = ( icon:GrAthom, ctx:CanvasRenderingContext2D ) => {
    const is = splitCruvePoint(icon.path);
    const getFillStyle = (i:number ) => 
        !icon.color ? undefined:( 
            !Array.isArray(icon.color)? icon.color: 
                ( icon.color.length > i ? icon.color[i] : icon.color[icon.color.length-1] ) 
        )
    const draw = (a:number,i:CruvePoint[]) => {
        ctx.beginPath();  
        ctx.moveTo(i[0].begin.x, i[0].begin.y);
        i.forEach( p => ctx.bezierCurveTo(p.p1.x,p.p1.y,p.p2.x,p.p2.y,p.end.x,p.end.y));
        ctx.fillStyle = getFillStyle(a) ;
        ctx.fill();
        return a + 1;
    }
    console.log(is);
    is.reduce( draw, 0);
}

const drawIcon = ( icon:GrIcon, context:CanvasRenderingContext2D ) => icon.athoms.forEach( x => drawAthom(x,context))


/**
 *  legasy Data to Athom
 */
const legasyToFillAthom = (lPath:number[][], color:string):GrAthom => ({ path: legasyToCruvePath(lPath), color: color, action:GrAction.Fill})
const IconAddAthom = ( athom: GrAthom, icon:GrIcon = { athoms:[]} ):GrIcon =>  ({ ...icon,  athoms: [ ...icon.athoms, athom] }) ;
const IconFromLegasy = ( lPath:number[][], color:string ):GrIcon =>  IconAddAthom( legasyToFillAthom( lPath,color )  )  ;

const legasyStrToFillAthom = (lPath:string, color:grStyles):GrAthom => ({ path: legasyStrToCruvePath(lPath), color: color, action:GrAction.Fill})
const IconFromLegasyStr = ( lPath:string, color:grStyles ):GrIcon =>  IconAddAthom( legasyStrToFillAthom( lPath,color )  )  ;


/***************************************************************/
const data1 = [ 
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

const data2 = [ 
    [50,10,104,10,104,90,50,90],
    [50,90,-4,90,-4,10,50,10],
    [50,10,50,10,50,14,50,14],
    [50,14,98,14,98,86,50,86],
    [50,86,2,86,2,14,50,14],
    [50,14,50,14,50,10,50,10]
];

const data = [
    [11, 39, 19, 14, 92, 12, 93, 49], [93, 49, 94, 49, 87, 43, 86, 44],
    [86, 44, 85, 19, 26, 16, 18, 39], [18, 39, 18, 39, 25, 39, 25, 39],
    [25, 39, 25, 39, 25, 33, 25, 33], [25, 33, 25, 33, 32, 33, 32, 33],
    [32, 33, 32, 33, 32, 39, 32, 39], [32, 39, 32, 39, 43, 39, 43, 39],
    [43, 39, 43, 39, 43, 33, 43, 33], [43, 33, 43, 33, 50, 33, 50, 33],
    [50, 33, 50, 33, 50, 39, 50, 39], [50, 39, 50, 39, 63, 39, 63, 44],
    [63, 44, 63, 44, 62, 48, 59, 48], [59, 48, 59, 48, 63, 49, 63, 49],
    [63, 49, 63, 49, 72, 33, 72, 33], [72, 33, 72, 33, 79, 33, 79, 33],
    [79, 33, 79, 33, 79, 53, 79, 53], [79, 53, 84, 54, 88, 57, 88, 62],
    [88, 62, 87, 85, 9, 84, 9, 49], [9, 49, 9, 49, 10, 45, 10, 44],
    [10, 44, 10, 44, 17, 43, 17, 43], [17, 43, 17, 43, 16, 49, 16, 49],
    [16, 49, 16, 83, 83, 79, 83, 62], [83, 62, 83, 59, 79, 57, 79, 57],
    [79, 57, 79, 57, 79, 64, 79, 64], [79, 64, 79, 64, 72, 64, 72, 64],
    [72, 64, 72, 64, 72, 54, 72, 54], [72, 54, 72, 54, 67, 53, 67, 53],
    [67, 53, 67, 53, 69, 49, 69, 49], [69, 49, 69, 49, 72, 50, 72, 50],
    [72, 50, 72, 50, 72, 44, 72, 44], [72, 44, 72, 44, 61, 64, 61, 64],
    [61, 64, 61, 64, 54, 64, 54, 64], [54, 64, 54, 64, 61, 51, 61, 51],
    [61, 51, 61, 51, 54, 49, 54, 49], [54, 49, 54, 49, 52, 46, 52, 46],
    [52, 46, 52, 46, 57, 45, 57, 44], [57, 44, 57, 43, 50, 42, 50, 42],
    [50, 42, 50, 42, 50, 64, 50, 64], [50, 64, 50, 64, 43, 64, 43, 64],
    [43, 64, 43, 64, 43, 42, 43, 42], [43, 42, 43, 42, 32, 42, 32, 42],
    [32, 42, 32, 42, 32, 64, 32, 64], [32, 64, 32, 64, 25, 64, 25, 64],
    [25, 64, 25, 64, 25, 42, 25, 42], [25, 42, 25, 42, 4, 44, 4, 47],
    [4, 47, 4, 47, 4, 40, 4, 40], [4, 40, 5, 39, 11, 39, 11, 39]
];

const datastr = '{{40,18,44,10,56,10,60,18},{60,18,60,18,92,72,92,72},{92,72,96,80,92,88,82,88},{82,88,82,88,18,88,18,88},{18,88,8,88,4,80,8,72},{8,72,8,72,40,18,40,18},{40,18,40,18,40,34,40,34},{40,34,40,34,18,70,18,70},{18,70,12,80,14,80,22,80},{22,80,22,80,76,80,76,80},{76,80,88,80,88,78,82,70},{82,70,82,70,56,28,56,28},{56,28,50,20,50,20,44,28},{44,28,44,28,40,34,40,34},{34,50,37,45,36,44,40,44},{40,44,40,44,46,44,46,44},{46,44,48,44,51,44,52,48},{52,48,52,48,58,62,58,62},{58,62,58,62,66,68,66,68},{66,68,66,68,74,65,75,60},{75,60,75,60,83,73,83,73},{83,73,87,78,84,79,80,79},{80,79,80,79,57,79,57,79},{57,79,57,79,65,76,64,70},{64,70,64,70,56,64,56,64},{56,64,56,64,56,74,56,74},{56,74,56,79,50,78,50,74},{50,74,50,74,50,64,50,64},{50,64,50,64,50,58,50,58},{50,58,50,58,53,60,53,60},{53,60,53,60,50,52,50,52},{50,52,50,52,47,56,47,56},{47,56,47,56,50,58,50,58},{50,58,50,58,50,66,50,66},{50,66,50,66,40,60,40,60},{40,60,38,59,36,57,39,54},{39,54,39,54,46,47,46,47},{46,47,46,47,42,47,42,47},{42,47,39,47,39,48,38,50},{38,50,38,50,41,52,41,52},{41,52,41,52,39,54,39,54},{39,54,39,54,34,50,34,50},{38,60,38,60,43,63,43,63},{43,63,43,63,43,67,43,67},{43,67,43,67,40,74,40,74},{40,74,37,78,32,75,35,71},{35,71,35,71,38,65,38,65},{38,65,38,65,38,60,38,60},{52,36,58,34,62,44,56,46},{56,46,50,48,48,37,52,36}}';

const ic = IconFromLegasy(data,"blue") ;
//const ic = IconFromLegasyStr(datastr,["blue","red","Green","black"]) ;
//const ic = IconFromLegasyStr(datastr,["red","black"]) ;

export const drawIconTest = (context:CanvasRenderingContext2D ) =>  drawIcon(IconAsSize(ic,{height:100,width:100}) , context  );