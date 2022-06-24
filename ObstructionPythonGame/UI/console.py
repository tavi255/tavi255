

class Console:

    def __init__(self,player,computer):

        self.__player=player
        self.__computer=computer

    def __print_state(self):
        """
        Prints the current state of the board
        :return:
        """

        board=self.__player.get_board()

        for line in board:
            for cell in line:
                print(cell,end=" ")
            print()

        print()
        print()

    def __game_over(self):

        """

        :return:1 if the board is full 0 if not
        """
        if self.__player.is_full():
            return 1
        return 0

    def __human_move(self):
        """
        The human player performs a move
        :return: -
        """
        i=int(input("Enter the index of the line:"))-1
        j=int(input("Enter the intex of the column"))-1
        self.__player.player_move(i,j)

    def __computer_move(self):
        """
        The computer performs a move
        :return: -
        """

        self.__computer.computer_move()

    def run_game(self):

        start=-1
        if self.__player.get_ch()=='O':
            start=1

        while not self.__game_over():

            try:
                if start==1:
                    self.__human_move()
                else:
                    self.__computer_move()

                self.__print_state()

                start=-start

            except ValueError as ve:
                print("Invalid input!!\n")
            except IndexError as ie:
                print(str(ie))

        print("Winner:",end=" ")
        if start=='1':
            print("Human_player")
        else:
            print("Computer")



