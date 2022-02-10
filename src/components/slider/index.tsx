import React, {FC, DragEvent, useState, useEffect, useRef} from 'react';
import './styles.css';
import { Application } from '../../interfaces/application';
import { getSliderRangeForApplications } from '../../utils/application';

interface SliderProps {
    applications: Application[],
    onSliderUpdate: Function
}

const indicatorWidth = 20;

const Slider: FC<SliderProps> = (props) => {
    const barDomElementRef = useRef<HTMLDivElement>(null);
    const {
        applications,
        onSliderUpdate
    } = props;

    let barWidth = 0;
    let barStartX = 0;

    const range = getSliderRangeForApplications(applications);
    const [indicatorPosition, setIndicatorPosition] = useState({ x: 0 })
    const [isDragging, setIsDragging] = useState(false);
    const [sliderValue, setSliderValue] = useState(0)

    function updateIndicatorPosition(ev: MouseEvent) {
        const maxXDelta = barWidth - indicatorWidth
        const mousePos = ev.clientX - barStartX;

        const barXDeltaPercent = (maxXDelta / 100) * mousePos;
        let spendPercent = Math.round((range.maxValue / 100) * barXDeltaPercent);

        let xPosInRange = mousePos;
        if (mousePos > maxXDelta) {
            xPosInRange = maxXDelta
            spendPercent = range.maxValue
        } else if (mousePos < 0) {
            xPosInRange = 0;
            spendPercent = 0;
        }       

        setIndicatorPosition({
            x: xPosInRange
        })
        setSliderValue(spendPercent)
        onSliderUpdate(spendPercent)
    }    

    // Every time state updates - it will rerender all of this
    // If this current re-render (when start now = true) we want to add our event listeners
    useEffect(() => {
        if (!isDragging) return;

        window.addEventListener("mousemove", updateIndicatorPosition);
        window.addEventListener("mouseup", stopDrag)
 
        return(() => {
            window.removeEventListener("mouseup", stopDrag);
            window.removeEventListener("mousemove", updateIndicatorPosition)
        })
    }, [isDragging])

    // Get inital positions of bar chart - used for deciding it's position
    // This needs to be run every time there is a reload as otherwise will not be able to get values
    // for the current render
    useEffect(() => {
        // Get max width value of range (use this to relatvily set indicator value)
        if (barDomElementRef.current) {
            barWidth = barDomElementRef.current.offsetWidth;
            barStartX = barDomElementRef.current.getBoundingClientRect().left;
        }
    })

    // Once loading component for first time - start at the end
    useEffect(() => {
        setIndicatorPosition({
            x: barWidth - indicatorWidth,
        })
        setSliderValue(range.maxValue)
    }, [])

    function startDrag() {
        setIsDragging(true);
    }
    function stopDrag() {
        setIsDragging(false);
    }

    return <div className="slider">
        <div className="slider-container">
            <div className="slider_bar" ref={barDomElementRef}>                
                <div 
                    style={{
                        position: 'absolute',
                        top: 12, // 10 for half height of bar (20) and 2 for bar borders (1px each)
                        left: indicatorPosition.x
                    }}
                    onMouseDown={startDrag}
                    className="slider_bar-indicator"
                >
                    <p>{sliderValue}</p>
                </div>
                <div className="slider_bar-background"></div>
                <div  className="slider_bar--range-display">
                    <p>{range.minValue}</p>
                    <p>{range.maxValue}</p>
                </div>
            </div>
        </div>
    </div>
}

export default Slider;