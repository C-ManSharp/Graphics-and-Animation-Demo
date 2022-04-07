"use strict";
export class DrawBridgeAnimation
{
    //Variable to store the physical drawbridge
    drawBridge = null;
    //Keep track on if the draw bridge is open or closed
    drawbridgeIsClosed = true;
    //Flags that are toggled to true when the draw bridge is moving.
    drawbridgeIsOpening = false;
    drawbridgeIsClosing = false;
    //Hold the maximum amount that the drawbridge can rotate.
    maxFlatDegreeRotation = (Math.PI / 2); 
    animationStart = 0;
    animationEnd = 180;
    steps = 1000000;
    g = [];
    iFrame = 0;
    constructor(drawBridge)
    {
        //Check the type of the parameter for debugging
        if(typeof drawBridge != "object")
        {
            console.error("Error, DrawBridgeAnimation constructor parameter must be a draw bridge");
        }
        else
        {
            this.drawBridge = drawBridge;
            this.g[0] = 0;
            this.calcGValues();
        }
    }
    /*
    Returns true if the draw bridge is opening false otherwise.
    */
    getDrawbridgeIsOpening()
    {
        return this.drawbridgeIsOpening;
    }
    /*
    Returns true if the draw bridge is closing false otherwise.
    */
    getDrawbridgeIsClosing()
    {
        return this.drawbridgeIsClosing;
    }

    openDrawbridgeAnimation()
    {
        //Set the flag
        this.drawbridgeIsOpening = true;
        //Change the text UI
        document.getElementById("drawbridgeData").innerHTML = "Opening";
        document.getElementById("drawbridgeData").style.color = "#E1341E";
        //Once the drawbridge has rotate 90 degrees the animation is finished
        if(this.drawBridge.rotation.x >= this.maxFlatDegreeRotation)
        {
            //Make sure that the drawbridge is in the correct position when the animation is finished.
            this.drawBridge.rotation.x = this.maxFlatDegreeRotation;
            //Set flags
            this.drawbridgeIsOpening = false;
            this.drawbridgeIsClosed = false;
            //Change UI
            document.getElementById("drawbridgeData").innerHTML = "Open";
            document.getElementById("drawbridgeData").style.color = "#2ED1B5";
            this.iFrame = 0;
        }

        if(this.drawbridgeIsClosed)
        //Animate the drawbridge
            this.drawBridge.rotation.x += this.interpolate(this.getUByArchlen(this.iFrame / this.steps));
            
        this.iFrame++;
    }

    closeDrawbridgeAnimation()
    {
        //Toggle flag
        this.drawbridgeIsClosing = true;
        //Change the text UI
        document.getElementById("drawbridgeData").innerHTML = "Closing";
        document.getElementById("drawbridgeData").style.color = "#E1341E";
        //Once the rotation of x is 0 then the animation is finished.
        if(this.drawBridge.rotation.x <= 0)
        {
            //Make sure that the drawbridge is in the correct position
            this.drawBridge.rotation.x = 0;
            //Set flags
            this.drawbridgeIsClosing = false;
            this.drawbridgeIsClosed = true;
            //Change text UI
            document.getElementById("drawbridgeData").innerHTML = "Closed";
            document.getElementById("drawbridgeData").style.color = "#2ED1B5";
            this.iFrame = 0;
        }
        if(!this.drawbridgeIsClosed)
        //Animate the drawbridge
            this.drawBridge.rotation.x -= this.interpolate(this.getUByArchlen(this.iFrame / this.steps));
        this.iFrame++;
    }

    interpolate(u)
    {
        if(u > 1)
            u = 1;
        if(u < 0)
            u = 0;
        return u*(this.animationEnd-this.animationStart) + this.animationStart;
    }

    calcGValues()
    {
        
        for(let i = 1; i <= 20; i++)
        {
            let pos1 = this.interpolate((i-1) * 0.05);
            let pos2 = this.interpolate(i * 0.05);
            
            let distance = Math.sqrt(Math.pow(pos1-pos2, 2) + Math.pow(pos1 - pos2, 2));
            this.g[i] = distance + this.g[i - 1];
        }

        for(let i = 1; i <= 20; i++)
        {
            this.g[i] /= this.g[20];
        }
    }

    getUByArchlen(arcLen)
    {
        for(let i = 0; i <= 20; i++)
        {
            if(this.g[i] > arcLen)
            {
                return (i-1) * 1/20 + (arcLen - this.g[i-1]) / (this.g[i] - this.g[i-1]) * 1/20;
            }
        }
        return 1;
    }
    /*
    Sets if the drawbridge is closed or not. For debugging purposes.
    */
    setDrawBridgeIsClosed(drawbridgeIsClose)
    {
        this.drawbridgeIsClosed = drawbridgeIsClose;
    }
    /*
    Returns true is the drawbridge is closed (upright). Returns false otherwise.
    */
    getDrawBridgeIsClosed()
    {
        return this.drawbridgeIsClosed;
    }
}