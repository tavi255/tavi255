from UI.console import Console
from repository.board import BoardRepo
from services.player_services import PlayerServices, ComputerServices
from strategies.mirror_strategy import Strategy
from validators.validator import Validator

if __name__ == '__main__':

    repo=BoardRepo(7,7)
    validator=Validator()
    strategy=Strategy(repo,validator,'O').mirror_strategy
    computer=ComputerServices(repo,validator,'O',strategy)
    player=PlayerServices(repo,validator,'X')
    console=Console(player,computer)
    console.run_game()
