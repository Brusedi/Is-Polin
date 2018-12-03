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

/**
 * Path of beze
 */
// interface CruvePath{
//     path:CruvePoint[]
// }

export enum GrAction {  Stroke, Fill, Clear }

/*
*  Graph primitive by  
*/
interface GrAthom{
    path:CruvePoint[],
    color:string,
    action:GrAction,
}

interface GrIcon{
    athoms:GrAthom[]
}

/**
 *  Legasy converters
 */
const valOrZero = ( p:number[], index:number ) => p.length < index ? p[index] : 0
const indToPoint = ( p:number[], begIndex:number ):Point => ({x:valOrZero(p,begIndex),y:valOrZero(p,begIndex+1)})
const legasyToCruvePoint = (p:number[]) => ({ begin:indToPoint(p,1), p1:indToPoint(p,3), p2:indToPoint(p,5), end:indToPoint(p,7) })
const legasyToCruvePath = (lPath:number[][]) => lPath.map( x => legasyToCruvePoint(x)  )

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

//
const drawAthom = ( icon:GrAthom, ctx:CanvasRenderingContext2D ) =>{
    const fin = () =>  icon.action == GrAction.Stroke ?  ctx.stroke() : ( icon.action == GrAction.Clear? ctx.stroke(): ctx.fill() )
    const drawStep = ( endPoint:Point, p:CruvePoint ) =>{
        const move  = (p:Point) => {ctx.beginPath();  ctx.moveTo(p.x, p.y); }
        const isBrake = endPoint && !PointEq(endPoint, p.begin ) ;
        (isBrake)? fin():null;
        (isBrake) || ! endPoint ? move(p.begin) :null;
        ctx.bezierCurveTo(p.p1.x,p.p1.y,p.p2.x,p.p2.y,p.end.x,p.end.y);
        return p.end;
    }
    icon.path.reduce(  drawStep , undefined );
    fin();
}

const drawIcon = ( icon:GrIcon, context:CanvasRenderingContext2D ) => icon.athoms.forEach( x => drawAthom(x,context))
