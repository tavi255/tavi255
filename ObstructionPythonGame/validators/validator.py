
class Validator:

   @staticmethod
   def in_board(i,j,n,m):
      return (i>=0 and j>=0 and i<n and j<m)

   @staticmethod
   def is_empty(board,i,j):
      return board[i][j]==0

   @staticmethod
   def custom_error(message):
      raise IndexError(message)