import unittest

from repository.board import BoardRepo
from services.player_services import PlayerServices, ComputerServices
from strategies.mirror_strategy import Strategy
from validators.validator import Validator


class Test(unittest.TestCase):

    def test_repo(self):

        repo=BoardRepo(6,6)

        board=repo.get_board()

        self.assertEqual(6,len(board))

        for i in range(len(board)):
            self.assertEqual(6,len(board[i]))
            for j in range(len(board[i])):
                self.assertEqual(0,board[i][j])


        repo.update_cell(1,3,'X')
        board=repo.get_board()


        self.assertEqual('X',board[1][3])

        self.assertEqual('X',repo.get_cell(1,3))

        self.assertEqual((6,6),repo.get_lenght())

        self.assertEqual((1,3),repo.get_last_move())

        self.assertFalse(repo.is_full())


    def test_services(self):

        repo=BoardRepo(7,7)
        validator=Validator()
        strategy=Strategy(repo,validator,'O')
        player=PlayerServices(repo,validator,'X')
        computer=ComputerServices(repo,validator,'O',strategy.mirror_strategy)

        computer.computer_move()
        move=repo.get_last_move()
        board=repo.get_board()
        board_len=repo.get_lenght()

        self.assertEqual(board[3][3],'O')
        self.assertEqual(repo.get_cell(3,3),'O')
        self.assertEqual((3,3),move)

        di = [1, 0, -1, 0, 1, 1, -1, -1]
        dj = [0, 1, 0, -1, 1, -1, 1, -1]


        n = board_len[0]
        m = board_len[1]

        for k in range(8):
            ni = 3 + di[k]
            nj = 3 + dj[k]
            if validator.in_board(ni, nj, n, m):
                self.assertEqual(repo.get_cell(ni,nj),1)



        player.player_move(1,3)

        with self.assertRaises(IndexError) as ie:
            player.player_move(8,7)

        self.assertEqual("Invalid indexes!!\n",str(ie.exception))


        computer.computer_move()
        self.assertEqual((5,3),repo.get_last_move())

        self.assertEqual('O',repo.get_cell(5,3))


        board=player.get_board()

        self.assertEqual(7,len(board))

        self.assertFalse(player.is_full())

        self.assertEqual('X',player.get_ch())

        self.assertEqual('O',computer.get_ch())


        repo = BoardRepo(6, 6)
        validator = Validator()
        strategy = Strategy(repo, validator, 'O')
        player = PlayerServices(repo, validator, 'X')
        computer = ComputerServices(repo, validator, 'O', strategy.no_strategy)

        player.player_move(1,3)

        computer.computer_move()
