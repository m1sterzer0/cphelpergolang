import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import './style.css';

interface AppMsg { type: string, value: any }
declare global {
    const tsvscode : {
        postMessage : (msg:AppMsg) => void;
        getState: () => any;
        setState: (state: any) => void;
    };
};
interface AppProps { id: string };
interface AppState { structname: string, datatype1: string, datatype2: string };
const App = ({ id }: AppProps):JSX.Element => {
    const initState : AppState = { structname: "default", datatype1: "int", datatype2: "int" };
    const [state,setState] = React.useState<AppState>(initState);
    const doReset = ( (event:any) => { setState(initState) } );
    const handleChange = ( (event:any) => { setState( prevState => ({...prevState, [event.target.name]: event.target.value}))})
    const handleClick = ( (sname:string) => {
        //console.log(sname);
        tsvscode.postMessage({type: "addText", value: { key: sname, structname: state.structname, datatype1: state.datatype1, datatype2: state.datatype2} } );
    } );
    return (
        <div className="divTop">
            <div className="topBar">
                <div className="block">
                    <label>Struct Name:</label>
                    <input className="debrinfield" type="text" name="structname" value={state.structname} onChange={handleChange}/>
                </div>
                <div className="block">
                    <label>Datatype 1:</label>
                    <input className="debrinfield"  type="text" name="datatype1"  value={state.datatype1}  onChange={handleChange}/>
                </div>
                <div className="block">
                    <label>Datatype 2:</label>
                    <input className="debrinfield"  type="text" name="datatype2"  value={state.datatype2}  onChange={handleChange}/>
                </div>
                <button className="button resetbutton" onClick={doReset}>Reset</button>
            </div>
            <hr></hr>
            <div className="ButtonArray1">
                <div className="ButtonRow">
                    <button className="button2" onClick={(event) =>  {handleClick("queue")}}>queue</button>
                    <button className="button2" onClick={(event) =>  {handleClick("stack")}}>stack</button>
                    <button className="button2" onClick={(event) =>  {handleClick("deque")}}>deque</button>
                </div>
                <div className="ButtonRow">
                    <button className="button2" onClick={(event) =>  {handleClick("minheap")}}>minheap</button>
                    <button className="button2" onClick={(event) =>  {handleClick("segtree")}}>segtree</button>
                    <button className="button2" onClick={(event) =>  {handleClick("lazysegtree")}}>lazysegtree</button>
                </div>
                <div className="ButtonRow">
                    <button className="button2" onClick={(event) =>  {handleClick("rbtreeset")}}>rbtreeset</button>
                    <button className="button2" onClick={(event) =>  {handleClick("rbtreemultiset")}}>rbtreemultiset</button>
                    <button className="button2" onClick={(event) =>  {handleClick("rbtreemap")}}>rbtreemap</button>
                </div>
            </div>
            <hr></hr>
            <div className="ButtonArray2">
                <div className="ButtonRow">
                    <button className="button2" onClick={(event) =>  {handleClick("bitset")}}>bitset</button>
                    <button className="button2" onClick={(event) =>  {handleClick("convolver")}}>convolver</button>
                    <button className="button2" onClick={(event) =>  {handleClick("fenwick")}}>fenwick</button>
                </div>
                <div className="ButtonRow">
                    <button className="button2" onClick={(event) =>  {handleClick("maxflow")}}>maxflow</button>
                    <button className="button2" onClick={(event) =>  {handleClick("matching")}}>matching</button>
                    <button className="button2" onClick={(event) =>  {handleClick("dsu")}}>dsu</button>
                </div>
                <div className="ButtonRow">
                    <button className="button2" onClick={(event) =>  {handleClick("dsusparse")}}>dsusparse</button>
                    <button className="button2" onClick={(event) =>  {handleClick("mincostflow")}}>mincostflow</button>
                    <button className="button2" onClick={(event) =>  {handleClick("scc")}}>scc</button>
                </div>
                <div className="ButtonRow">
                    <button className="button2" onClick={(event) =>  {handleClick("twosat")}}>twosat</button>
                    <button className="button2" onClick={(event) =>  {handleClick("bisect")}}>bisect</button>
                    <button className="button2" onClick={(event) =>  {handleClick("crt")}}>crt</button>
                </div>
                <div className="ButtonRow">
                    <button className="button2" onClick={(event) =>  {handleClick("geo2d")}}>geo2d</button>
                </div>
            </div>

        </div>
    );
} 
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<React.StrictMode><App id="app" /></React.StrictMode>);

