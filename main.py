# Reference : https://github.com/yevini118/choco_sweeper/blob/main

import random, pygame, sys, time
from pygame.locals import *

# sizes
WINDOWWIDTH = 800
WINDOWHEIGHT = 650
CELLSIZE = 25
MOTIONWIDTH = CELLSIZE * 5
MONITORWEIGHT = CELLSIZE * 3

XMARGIN = CELLSIZE
YMARGIN = CELLSIZE * 5

# RGB

# Syntax
mine = -1
none = 0
flag = -1
opened = 1

def main():
	global DISPLAYSURF, GAMEDISPLAY, GAMEWINDOWWIDTH, GAMEWINDOWHEIGHT, CELLWORTH, MINECOUNT, BASICFONT, FACEIMG

	DISPLAYSURF = pygame.display.set_mode((WINDOWWIDTH, WINDOWHEIGHT), RESIZABLE)
	BASICFONT = pygame.font.Font('')