import random


class Strategy:

    def __init__(self,repo,validator,chr):

        self.__repo=repo
        self.__validator=validator
        self.__chr=chr

    def no_strategy(self):
        """
        The computer performs a random move
        :return: the move of the computer(tuple of 2 natural num)
        """

        board=self.__repo.get_board()
        board_len=self.__repo.get_lenght()

        n=board_len[0]
        m=board_len[1]

        i=random.randint(0,n)
        j=random.randint(0,m)

        while not  self.__validator.in_board(i,j,n,m) or not self.__validator.is_empty(board,i,j):
            i = random.randint(0, n)
            j = random.randint(0, m)

        return (i,j)


    def mirror_strategy(self):
        """
        Plays the mirror image of the second player's move.
        :return:the move of the computer(tuple of 2 natural num)
        """
        move=self.__repo.get_last_move()
        board_len=self.__repo.get_lenght()

        n=board_len[0]
        m=board_len[1]

        if move:
            i=move[0]
            j=move[1]

            ni=n-i-1
            nj=m-j-1

            return (ni,nj)


        else:
            i=n//2
            j=m//2
            return (i,j)





