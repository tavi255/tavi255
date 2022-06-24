
class BoardRepo:

    def __init__(self,n,m):

        self.__board=[[0 for j in range(m)]for i in range(n)]
        self.__last_move=None
        self.__size=n*m

    def __update_last_move(self,n,m):
        """
        Updates the variable that stores the last move
        :param n: the n-th line(natural num)
        :param m: the m-th column(natural num)
        :return: -
        """
        self.__last_move=(n,m)


    def get_cell(self,n,m):
        """
        Returns a cell from the board
        :param n: the n-th line(natural num)
        :param m: the n-th column(natural num)
        :return: the cell
        """
        return self.__board[n][m]

    def update_cell(self,n,m,val):
        """

        Replaces a cell with a value
        :param n: the n-th line(natural num)
        :param m: the n-th column(natural num)
        :return: -
        """
        self.__board[n][m]=val
        self.__size-=1
        if type(val)!=int:
            self.__update_last_move(n,m)

    def get_lenght(self):
        """

        :return:the lenght of the board(tuple)
        """
        return (len(self.__board),len(self.__board[0]))

    def get_last_move(self):
        """

        :return returns the last move performed
        """
        return self.__last_move

    def get_board(self):
        """

        :return:the entire board
        """

        return self.__board

    def is_full(self):
        """

        :return:1 if the board is full 0 if not
        """
        return 1 if self.__size==0 else 0