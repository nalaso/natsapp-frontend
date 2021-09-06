import React from 'react'

const ThemeSelector = () => {

    const openstore = () => {
        // var win = window.open("https://natsapp.nalasky.now.sh", '_blank');
        // win.focus();
    }

    return (
        <section className="Themeconfig">
            <section className="configSect">
                <div className="profile">
                    <p className="confTitle">Themes</p>
                    
                    <div className="mid">
                        <input type="password" className="themeinput" placeholder="Enter Theme code.." />
                    </div>    
                    <button className="changePic" onClick={()=>{alert("Wrong code")}}>Enter</button>
                </div>
            </section>

            <section className="configSect">
                <div className="profile">
                    <button className="edit" onClick={openstore}>Get Theme code(alpha)</button>
                </div>
            </section>
            
            <section className="configSect second">		
                
                <p className="confTitle">Default Themes </p>
                
                    <div className="optionWrapper">
                        <input type="checkbox" id="checklight" className="toggleTracer" />
                        
                        <label className="check" htmlFor="checklight">
                            <div className="tracer"></div>
                        </label>
                        <p>Light theme</p>
                    </div>

                    <div className="optionWrapper">
                        <input type="checkbox" id="checkNight" className="toggleTracer" defaultChecked="checked"/>
                        
                        <label className="check" htmlFor="checkNight">
                            <div className="tracer"></div>
                        </label>
                        <p>Dark theme</p>
                    </div>

                    <div className="optionWrapper">
                        <input type="checkbox" id="checkViolet" className="toggleTracer" />
                        
                        <label className="check" htmlFor="checkViolet">
                            <div className="tracer"></div>
                        </label>
                        <p>Custom dark theme</p>
                    </div>
                
            </section>	
        </section>
    )
}

export default ThemeSelector
