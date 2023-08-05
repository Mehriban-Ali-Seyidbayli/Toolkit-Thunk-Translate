import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAnswer, getLanguages, } from "../redux/translateState";
import Select from "react-select";

const MainPage = () => {
    const [prompt, setPrompt] = useState("");
    const [sourceLang, setSourceLang] = useState({ value: 'az', label: 'Azerbaijani' });
    const [targetLang, setTargetLang] = useState(
        { value: 'en', label: 'English' });


    const state = useSelector((state) => state);
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(getLanguages());
    }, [])


    const handleClick = () => {
        dispatch(getAnswer({ prompt, sourceLang, targetLang }));

    }



    return (
        <>
            <h1>Translate +</h1>
            <div className="container">
                <div className="left">
                    <Select
                        value={sourceLang}
                        onChange={(e) => {
                            setSourceLang(e);
                        }}
                        className="select" options={state.languages} />
                    <textarea onChange={(e) => setPrompt(e.target.value)} type="text" />
                </div>
                <div className="right">
                    <Select
                        value={targetLang}
                        onChange={(e) => {
                            setTargetLang(e)
                        }}
                        className="select" options={state.languages} />
                    <textarea disabled
                        className={`disabled-text ${state.isLoading && "loading"}`}
                        value={state.answer} type="text" />
                </div>
            </div>
            <button onClick={handleClick}>Translate </button>
        </>
    )
}

export default MainPage;