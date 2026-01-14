import RPi.GPIO as GPIO
import time
import websockets
import asyncio


#setting up connection to websocket/joycon

async def handler(ws):
    #calls for msgs
    async for msg in ws:
        #instead of looping through msg, js use map to do all at once
        throttle, pitch, aButton= map(str, msg.split(","))
        return pitch,throttle,aButton
        print("direction: ", pitch, "throttle: ", throttle, aButton)
        
# creates websocket
async def main():
    async with websockets.serve(handler, "", 5432):
        await asyncio.Future()

# setting up motors 
GPIO.setmode(GPIO.BCM)

lFor = 17
rFor = 27

lBack = 22
rBack = 23

GPIO.setup(rBack,GPIO.OUT)
GPIO.setup(lFor,GPIO.OUT)
GPIO.setup(lBack,GPIO.OUT)
GPIO.setup(rFor,GPIO.OUT)


#running threads

pitch,throttle,aButton = asyncio.run(main())

GPIO.cleanup()



##
##while True:
##
##    i = input()
##    
##    if i == 'w':
##        GPIO.output(rFor,GPIO.HIGH)
##        GPIO.output(lFor,GPIO.HIGH)
##        time.sleep(1)
##        GPIO.output(rFor,GPIO.LOW)
##        GPIO.output(rBack,GPIO.LOW)
##        GPIO.output(lFor,GPIO.LOW)
##        GPIO.output(lBack,GPIO.LOW)
##        
##    if i == 'a':
##        GPIO.output(lFor,GPIO.HIGH)
##        time.sleep(.5)
##        GPIO.output(rFor,GPIO.LOW)
##        GPIO.output(rBack,GPIO.LOW)
##        GPIO.output(lFor,GPIO.LOW)
##        GPIO.output(lBack,GPIO.LOW)
##        
##    if i == 'd':
##        GPIO.output(rFor,GPIO.HIGH)
##        time.sleep(.5)
##        GPIO.output(rFor,GPIO.LOW)
##        GPIO.output(rBack,GPIO.LOW)
##        GPIO.output(lFor,GPIO.LOW)
##        GPIO.output(lBack,GPIO.LOW)
##    if i == 'r':
##        GPIO.output(rBack,GPIO.HIGH)
##        GPIO.output(lBack,GPIO.HIGH)
##        time.sleep(1)
##        GPIO.output(rFor,GPIO.LOW)
##        GPIO.output(rBack,GPIO.LOW)
##        GPIO.output(lFor,GPIO.LOW)
##        GPIO.output(lBack,GPIO.LOW)
##
##


