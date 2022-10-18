# Reference : https://github.com/yevini118/choco_sweeper/blob/main/choco_sweeper_v2.py

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
BGCOLOR =(213, 192, 170)
LINECOLOR = (179, 140, 101)
BLACK = (0, 0, 0)
WHITE = (255, 255, 255)
GREEN = (0, 176, 80)
DARKGREEN = (56, 87, 35)
BLUE = (0, 112, 192)
DARKBLUE = (0, 32, 96)
RED = (255, 0, 0)
DARKRED = (192, 0, 0)
TRANSRED = (255, 0, 0, 60)
PINK = (227, 134, 134)
YELLOW = (255, 230, 153)

# Syntax
mine = -1
none = 0
flag = -1
opened = 1

def main():
	global DISPLAYSURF, GAMEDISPLAY, GAMEWINDOWWIDTH, GAMEWINDOWHEIGHT, CELLWORTH, MINECOUNT, BASICFONT, FACEIMG

	pygame.init()

	DISPLAYSURF = pygame.display.set_mode((WINDOWWIDTH, WINDOWHEIGHT), RESIZABLE)
	BASICFONT = pygame.font.Font('source/CascadiaCode.ttf', 18)
	pygame.display.set_caption('Minesweeper')
	MINEIMG = pygame.image.load('')

	CELLWIDTH, CELLHEIGHT, MINECOUNT = showLevelScreen()
	GAMEWINDOWWIDTH, GAMEWINDOWHEIGHT = CELLSIZE * CELLWIDTH + XMARGIN * 2, CELLSIZE * CELLHEIGHT + YMARGIN + CELLSIZE
	GAMEDISPLAYSURF = pygame.display.set_mode((GAMEWINDOWWIDTH, GAMEWINDOWHEIGHT), RESIZABLE)

	while True:
		runGame()

def runGame():
	resetButton, boardSurf = drawBorder()