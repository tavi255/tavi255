cmake_minimum_required(VERSION 3.19)
project(a45_tavi255)

set(CMAKE_PREFIX_PATH "D:\\qt\\5.15.2\\mingw81_64\\lib\\cmake")

set(CMAKE_CXX_STANDARD 20)

set(CMAKE_AUTOMOC ON)
set(CMAKE_AUTORCC ON)
set(CMAKE_AUTOUIC ON)
set(QT_VERSION 5)
set(REQUIRED_LIBS Core Gui Widgets Charts)
set(REQUIRED_LIBS_QUALIFIED Qt5::Core Qt5::Gui Qt5::Widgets Qt5::Charts)


add_executable(a45_tavi255 main.cpp
        entity/Tutorial.cpp tests/test.cpp tests/test.h repository/Repo.h services/administrator.cpp services/administrator.h validator/validator.cpp validator/validator.h "Ui/UI administrator.cpp" "Ui/UI administrator.h" generator/generator.cpp generator/generator.h "Ui/Ui user.cpp" "Ui/Ui user.h" services/UserServices.cpp services/UserServices.h repository/Repo.cpp exceptions/exceptions.h exceptions/exceptions.cpp repository/FileRepo.cpp repository/FileRepo.h repository/SqlDatabase.cpp repository/SqlDatabase.h Ui/GuiUser.cpp Ui/GuiUser.h Ui/GuiAdmin.cpp Ui/GuiAdmin.h run_gui/RunGui.cpp run_gui/RunGui.h charts/PieSliceChart.cpp charts/PieSliceChart.h entity/Action.h entity/ActionAdd.cpp entity/ActionAdd.h entity/ActionRemove.cpp entity/ActionRemove.h entity/ActionUpdate.cpp entity/ActionUpdate.h repository/UndoRedoRepo.cpp repository/UndoRedoRepo.h Ui/TableView.cpp Ui/TableView.h Ui/Delegate.cpp Ui/Delegate.h)

find_package(Qt${QT_VERSION} COMPONENTS ${REQUIRED_LIBS} REQUIRED)
target_link_libraries(${PROJECT_NAME} ${REQUIRED_LIBS_QUALIFIED})

if (WIN32)
    set(DEBUG_SUFFIX)

    set(QT_INSTALL_PATH "${CMAKE_PREFIX_PATH}")
    if (NOT EXISTS "${QT_INSTALL_PATH}/bin")
        set(QT_INSTALL_PATH "${QT_INSTALL_PATH}/..")
        if (NOT EXISTS "${QT_INSTALL_PATH}/bin")
            set(QT_INSTALL_PATH "${QT_INSTALL_PATH}/..")
        endif ()
    endif ()
    if (EXISTS "${QT_INSTALL_PATH}/plugins/platforms/qwindows${DEBUG_SUFFIX}.dll")
        add_custom_command(TARGET ${PROJECT_NAME} POST_BUILD
                COMMAND ${CMAKE_COMMAND} -E make_directory
                "$<TARGET_FILE_DIR:${PROJECT_NAME}>/plugins/platforms/")
        add_custom_command(TARGET ${PROJECT_NAME} POST_BUILD
                COMMAND ${CMAKE_COMMAND} -E copy
                "${QT_INSTALL_PATH}/plugins/platforms/qwindows${DEBUG_SUFFIX}.dll"
                "$<TARGET_FILE_DIR:${PROJECT_NAME}>/plugins/platforms/")
    endif ()
    foreach (QT_LIB ${REQUIRED_LIBS})
        add_custom_command(TARGET ${PROJECT_NAME} POST_BUILD
                COMMAND ${CMAKE_COMMAND} -E copy
                "${QT_INSTALL_PATH}/bin/Qt${QT_VERSION}${QT_LIB}${DEBUG_SUFFIX}.dll"
                "$<TARGET_FILE_DIR:${PROJECT_NAME}>")
    endforeach (QT_LIB)
endif ()



