

class PlayerServices:

     def __init__(self,repo,validator,chr):

        self._repo=repo
        self._validator=validator
        self._chr=chr


     def get_board(self):
         """

         :return:the board (matrix)
         """
         return self._repo.get_board()

     def _create_square(self,i,j):

         """
         Updates all the neighbours of the current cell
         :param i:the index of the line(natural num)
         :param j: the index of the column(natural num)
         :return:-
         """

         di=[1,0,-1,0,1,1,-1,-1]
         dj=[0,1,0,-1,1,-1,1,-1]

         board_len = self._repo.get_lenght()
         board=self._repo.get_board()
         n = board_len[0]
         m = board_len[1]

         for k in range(8):
            ni=i+di[k]
            nj=j+dj[k]
            if self._validator.in_board(ni,nj,n,m) and self._validator.is_empty(board,ni,nj):
                self._repo.update_cell(ni,nj,1)


     def is_full(self):
         """
         Returns 1 if the board is full 0 if not
         :return:
         """
         return self._repo.is_full()

     def player_move(self,i,j):
         """
         Performs a move if the indexes are valid
         :param i:the index of the line(natural num)
         :param j: the index of the column(natural num)
         :return: -
         """

         board=self._repo.get_board()
         board_len=self._repo.get_lenght()
         n=board_len[0]
         m=board_len[1]

         if not self._validator.in_board(i,j,n,m) or not self._validator.is_empty(board,i,j):

             self._validator.custom_error("Invalid indexes!!\n")

         self._repo.update_cell(i, j, self._chr)
         self._create_square(i, j)


     def get_ch(self):
         """
         Returns the current character
         :return:
         """
         return self._chr


class ComputerServices(PlayerServices):

    def __init__(self,repo,validator,chr,strategy):

        super(ComputerServices, self).__init__(repo,validator,chr)
        self.__strategy=strategy

    def computer_move(self):
        """
        Computer performs a move
        :return: -
        """

        indexes = self.__strategy()

        i = indexes[0]
        j = indexes[1]
        self._repo.update_cell(i, j, self._chr)
        self._create_square(i, j)