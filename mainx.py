import random

gameboard = []
visible = []

def TenByTen():
	for i in range(1, 15):
		temp = random.randint(1, 100)
		gameboard.append(temp)

TenByTen()
for i in range(1, 100):
	if i in [10, 20, 30, 40, 50, 60, 70, 80, 90]:
		print('\n')
	elif i in gameboard:
		print('*', end = ' ')

	else:
		print('-', end = ' ')