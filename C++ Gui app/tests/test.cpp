////
//// Created by Tavi on 20.03.2021.
////
//
//#include "test.h"
//#include "../entity/Tutorial.h"
//#include "../repository/Repo.h"
//#include "../validator/validator.h"
//#include "../services/administrator.h"
//#include "../services/UserServices.h"
//#include "../exceptions/exceptions.h"
//#include <cassert>
//#include <iostream>
//
//void test_entity()
//{
//    string title="C++ classes";
//    string presenter="Derek";
//    string duration="01:30";
//    int nrlikes=32;
//    string link="www.fdsfsdf.asa";
//
//    Tutorial t(title,presenter,duration,nrlikes,link);
//
//    assert(title==t.get_title());
//    assert(presenter==t.get_presenter());
//    assert(duration==t.get_duration());
//    assert(nrlikes==t.get_likes());
//    assert(link==t.get_link());
//
//
//    t.set_likes(110);
//
//    assert(110==t.get_likes());
//
//}
//
//void test_repo() {
//
//    string title="C++ classes";
//    string presenter="Derek";
//    string duration="01:30";
//    int nrlikes=32;
//    string link="www.fdsfsdf.asa";
//    string file="";
//
//    Tutorial t(title,presenter,duration,nrlikes,link);
//
//    Repo repo(file);
//
//    assert(repo.size()==0);
//
//    repo.push(t);
//
//    assert(repo.size()==1);
//
//    assert(repo[0].get_likes()==32);
//
//    repo.remove(0);
//
//    assert(repo.size()==0);
//
//
//    for(int i=0;i<100;i++)
//        repo.push(t);
//
//    assert(repo.size()==100);
//
//    repo.remove(90);
//
//    try
//    {
//        repo.remove(100);
//        assert(false);
//    }
//    catch (runtime_error & err)
//    {
//        assert(true);
//
//    }
//
//    title="Titlu";
//    presenter="no_name";
//    duration="01:54";
//    nrlikes=112;
//    link="www.rtfvffd.com";
//
//    Tutorial k(title,presenter,duration,nrlikes,link);
//
//    repo.update(5,k);
//
//    assert(repo[5].get_title()==title);
//    assert(repo[5].get_likes()==112);
//    assert(repo[5].get_link()==link);
//    assert(repo[5].get_duration()=="01:54");
//    assert(repo[5].get_link()==link);
//
//
//
////    repo.push(t);
////
////    assert(repo.size()==1);
//
//
//
//
//
//
//}
//
//void test_validator()
//{
//    string title="Titlu";
//    string presenter="No_name";
//    string duration="01:54";
//    int nrlikes=112;
//    string link="www.rtfvffd.com";
//    Validator v;
//
//    Tutorial t(title,presenter,duration,nrlikes,link);
//
//    v.validate(t);
//
//
//
//    link="www.rtfvffdcom";
//
//    t=Tutorial(title,presenter,duration,nrlikes,link);
//    try
//    {
//        v.validate(t);
//        assert(false);
//    }
//    catch (InvalidTutorial &err)
//    {
//        assert(string("Invalid link!\n")==err.what());
//    }
//
//    title="";
//    presenter="";
//    duration="";
//    nrlikes=-32;
//    t=Tutorial(title,presenter,duration,nrlikes,link);
//
//
//    try
//    {
//        v.validate(t);
//        assert(false);
//    }
//    catch (InvalidTutorial &err)
//    {
//        assert(true);
//    }
//
//    title="Name";
//    duration="abc:ecd";
//    link="ffsf.acasa.com";
//    presenter="Eu";
//    nrlikes=21;
//
//    t=Tutorial(title,presenter,duration,nrlikes,link);
//
//    try
//    {
//        v.validate(t);
//        assert(false);
//    }
//    catch (InvalidTutorial &ex)
//    {
//        assert(true);
//    }
//
//    link="www.google.ro";
//
//    try
//    {
//        v.validate(t);
//        assert(false);
//    }
//    catch (InvalidTutorial &ex)
//    {
//        assert(true);
//    }
//
//
//
//
//}
//
//void test_services()
//{
//    string title="Titlu";
//    string presenter="No_name";
//    string duration="01:54";
//    int nrlikes=112;
//    string link="www.rtfvffd.com";
//    string file="Test.txt";
//    string watchlist="";
//    Tutorial t(title,presenter,duration,nrlikes,link);
//
//
//    FileRepo r(file,watchlist);
//
//    Validator v;
//    administrator s(&r,v);
//
//    s.add_tutorial(title,presenter,duration,nrlikes,link);
//
//    assert(r.size()==1);
//
//    try {
//        s.add_tutorial(title,presenter,duration,nrlikes,link);
//        assert(false);
//    }
//    catch (runtime_error &err)
//    {
//        assert(true);
//    }
//
//    title="Johnny bravo";
//    presenter="Mr John";
//    nrlikes=43;
//
//    s.update_tutorial(title,presenter,duration,nrlikes,link);
//
//    assert(r[0].get_title()==title);
//    assert(r[0].get_presenter()==presenter);
//    assert(r[0].get_likes()==nrlikes);
//
//    assert(s.size()==1);
//
//    assert(r[0].get_link()==link);
//
//
//
//    s.delete_tutorial(link);
//
//    assert(s.size()==0);
//
//    try {
//        s.delete_tutorial("dsfsdf");
//        assert(false);
//    }
//    catch (runtime_error &err)
//    {
//        assert(true);
//    }
//
//    try {
//        s.update_tutorial(title,presenter,duration,nrlikes,link);
//        assert(false);
//    }
//    catch (runtime_error &err)
//    {
//        assert(true);
//    }
//
//
//
//    s.add_tutorial(title,presenter,duration,nrlikes,link);
//    title="fsfsdfsd";
//    presenter="adadad";
//    duration="32:13:3123";
//    link="www.afsdffsdf.";
//
//    try
//    {
//        s.add_tutorial(title,presenter,duration,nrlikes,link);
//        assert(false);
//    }
//    catch (runtime_error &err)
//    {
//        assert(true);
//    }
//
//
//    title="Johnny bravo";
//    presenter="Mr John";
//    nrlikes=43;
//    duration="01:54";
//
//    link="www.rtfvffd.com";
//
//
//
//}
//
//void test_user()
//{
//    string file="Test.txt";
//    string store="";
//    FileRepo tutorials(file,store);
//    FileRepo watches(file,store);
//
//    string title="C++ classes";
//    string presenter="Derek";
//    string duration="01:30";
//    int nrlikes=32;
//    string link="www.fdsfsdf.asa";
//    Validator v;
//
//    UserServices ui(&tutorials,&watches,v);
//
//    Tutorial t(title,presenter,duration,nrlikes,link);
//
//    ui.add_watch(t);
//
//    assert(ui.size_watch()==1);
//
//    vector <Tutorial> k=ui.get_watches();
//
//    assert(k[0].get_title()==title);
//    assert(k[0].get_duration()==duration);
//    assert(k[0].get_presenter()==presenter);
//    assert(k[0].get_link()==link);
//    assert(k[0].get_likes()==nrlikes);
//
//
//
//    assert(ui.size_tutorials()==0);
//
//    tutorials.push(t);
//
//    assert(ui.size_tutorials()==1);
//
//    //ui.delete_watch(string("www.fdsfsdf.asa"),'N');
//
//    k=ui.get_tutorials();
//
//    assert(k[0].get_likes()==nrlikes);
//    assert(k[0].get_link()==link);
//    assert(k[0].get_presenter()==presenter);
//    assert(k[0].get_duration()==duration);
//    assert(k[0].get_title()==title);
//
//
//
//    try
//    {
//        ui.add_watch(t);
//        assert(false);
//    }
//    catch (runtime_error &ex)
//    {
//        assert(true);
//    }
//
//    ui.delete_watch(string("www.fdsfsdf.asa"),'Y');
//
//    assert(ui.size_watch()==0);
//    assert(ui.size_tutorials()==1);
//
//    k=ui.get_tutorials();
//
//    assert(k[0].get_likes()==nrlikes+1);
//
//
//
//    try
//    {
//        ui.delete_watch("www.fdsfsdf.asa",'N');
//        assert(false);
//    }
//    catch(runtime_error &ex)
//    {
//        assert(true);
//
//    }
//
//
//
//}
//
//void test_all()
//{
//    test_entity();
//    test_repo();
//    test_validator();
//    test_services();
//    test_user();
//
//}
