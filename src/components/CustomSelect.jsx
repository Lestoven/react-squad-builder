import { useState, useRef, useEffect } from "react"

export default function CustomSelect({formationsData}) {

    const [isOpen, setIsOpen] = useState(false);
    const selectBodyRef = useRef(null); // the ref "pointing" to the select's body, in order to determine if we click inside or outside of it
    const selectButtonRef = useRef(null); // the ref "pointing" to the select's triggering button
    
    const [selectTitle, setSelectTitle] = useState("Default Title");

    const openSelectMenu = () => {
       setIsOpen(!isOpen);
    }

    const handleClickOutside = (e) => { // Closing the select's body if we click outside
        if (selectBodyRef.current && !selectBodyRef.current.contains(e.target) && !selectButtonRef.current.contains(e.target)) { 
            // Checking if the ref "pointing" to the select's body exists and we clicked outside of it
            // If we clicked the selectButton then we shouldn't setIsOpen(false) beacuse it's onclick will open it (thats why the last condition needed)
            setIsOpen(false); // close the select's body
        }
    }

    const handleElementClick = (e) => {
        setSelectTitle(e.target.textContent)
        setIsOpen(false)
    }

    useEffect(() => {
        if (isOpen) { // If isOpen is true we need to "attach" the eventListener to clicking, beacuse we need to close the select's body if user clicks outside
            document.addEventListener("mousedown", handleClickOutside)
        } else { // If isOpen is false we need to remove the eventListener because that means the slect's body is already closed
            document.removeEventListener("mousedown", handleClickOutside)
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
        
    }, [isOpen]) // isOpen state change will trigger it
    
    return (
        <div className="custom-select-wrapper">
            <div className="custom-select">
                <div ref={selectButtonRef} className="select-trigger p-2 border border-gray-300 rounded-md shadow-lg" onClick={openSelectMenu}>
                    <span>{selectTitle}</span>
                    <div className="arrow"></div>
                </div>
                {
                    isOpen &&
                    <div ref={selectBodyRef} className="squad-builder-custom-select-body bg-black text-white rounded-md absolute z-50">
                        <div className="p-2">
                            <h4>Section 1</h4>
                            <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
                                {Object.keys(formationsData).map((formation, index) => (
                                    <div className="squad-builder-custom-select-item bg-blue-600 rounded-sm px-5" style={{ backgroundColor: selectTitle == formation && "red" }}
                                    onClick={handleElementClick} key={index}>{formation}</div>
                                ))}
                            </div>
                        </div>
                        <hr></hr>
                        <div className="p-2">
                            <h4>Section 2</h4>
                            <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
                                <div className="squad-builder-custom-select-item bg-blue-600 rounded-sm px-5">4-3-3</div>
                                <div className="squad-builder-custom-select-item bg-blue-600 rounded-sm px-5">4-3-3(2)</div>
                                <div className="squad-builder-custom-select-item bg-blue-600 rounded-sm px-5">4-3-3(2)</div>
                                <div className="squad-builder-custom-select-item bg-blue-600 rounded-sm px-5">4-3-3(2)</div>
                                <div className="squad-builder-custom-select-item bg-blue-600 rounded-sm px-5">4-3-3(2)</div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}