//
// Created by Tavi on 25.03.2021.
//

#include "Ui user.h"
#include <iostream>
#include <unistd.h>


using namespace std;

ConsoleU::ConsoleU(UserServices *user)
{
    this->user=user;
}


void ConsoleU::tutorial_menu()
{
    cout<<"1.Add to watchlist\n";
    cout<<"2.Go to the next one\n";
    cout<<"3.Exit to menu\n";


}

void ConsoleU::print_menu()
{

    cout<<"1.Print watch\n";
    cout<<"2.Print tutorials\n";
    cout<<"3.Delete a tutorial from the watchlist\n";
    cout<<"4.Open watchlist\n";
    cout<<"5.Exit\n";
}

void ConsoleU::print_watch()
{
    int o;


    scanf("%d",&o);

    if(o==1)
        system("start msedge.exe "
               "D:/github/a67-tavi255/cmake-build-debug/watchlist.html");
    else if(o==2)
        system("start excel.exe D:/github/a67-tavi255/cmake-build-debug/watchlist.csv");
    else

        cout<<"Invalid command\n";

}

void ConsoleU::watch_menu()
{
    cout<<"Which file would you like to open?\n";
    cout<<"1.HTMl\n";
    cout<<"2.CSV\n";
}

void ConsoleU::get_next(int &ind,int size)
{
    ind++;
    if(ind==size)
        ind=0;

}
void ConsoleU::add_watch(Tutorial &t)
{
    user->add_watch(t);
}
void ConsoleU::delete_tutorial()
{
    char str[101];
    string link; char ans;
    cout<<"Enter the link of the tutorial!\n";

    scanf("%s",str);

    link=string(str);

    getchar();

    cout<<"Did u enjoy the tutorial? Y/N: ";

    scanf("%c",&ans);

    user->delete_watch(link,ans);

}
void ConsoleU::print_watchlist()
{

    if(user->size_watch()==0)
    {
        cout<<"The watch list is empty!\n";
        return;
    }


    for(auto elem:user->get_watches())
        cout<<elem<<"\n";

}

void ConsoleU::save_watch()
{
    user->save_watch();
}

void ConsoleU::print_tutorials()
{
    if(user->size_tutorials()==0)
    {
        cout<<"The tutorial list is empty!\n";
        return;
    }


    char p[101];
    vector<Tutorial>tutorial,all;
    int nr=0,ind=0;

    cout<<"Enter the name of the presenter:";

    cin.get();
    cin.get(p,101);


    string name=string(p);
    all=user->get_tutorials();
    tutorial.resize(all.size());

    if(!name.size())
        tutorial=all;

    else
    {
        auto it=copy_if(all.begin(),all.end(),tutorial.begin(),[&name](Tutorial k){return k.get_presenter()==name;});
        tutorial.resize(it-tutorial.begin());
    }



        if(tutorial.size()==0)
        {
            cout<<"There are no tutorials in the database from: "<<name<<"\n";
            return;
        }


        bool ok=1; int opt;

        while(ok)
        {
            cout<<tutorial[ind]<<"\n";

            string path="start msedge.exe ";

            path+=tutorial[ind].get_link();

            system(path.c_str());

            sleep(1);

            tutorial_menu();


            scanf("%d",&opt);

            switch (opt) {

                case 1:
                {
                    add_watch(tutorial[ind]);
                    ok=0;
                    break;

                }
                case 2:
                {
                    get_next(ind,tutorial.size());
                    break;
                }
                case 3:
                {
                    ok=0;
                    break;
                }

                default:
                {
                    cout<<"Invalid command!\n";
                    break;
                }



            }


        }






}
void ConsoleU::run_console()
{
    bool ok=1;

    while(ok)
    {
        try
        {
            int opt;
            print_menu();

            scanf("%d",&opt);

            if(user->size_watch()>0)
                save_watch();

            switch (opt) {


                case 1:
                {
                    print_watchlist();
                    break;
                }
                case 2:
                {
                    print_tutorials();
                    break;
                }
                case 3:
                {
                    delete_tutorial();
                    break;
                }
                case 4:
                {
                    watch_menu();
                    print_watch();
                    break;

                }
                case 5:
                {
                    cout<<"Bye\n";
                    ok=0;
                    break;
                }
                default:
                {
                    cout<<"Invalid command!\n";
                    break;
                }

            }

        }

        catch (exception &ex)
        {
            cout<<ex.what()<<"\n";
        }

    }
}