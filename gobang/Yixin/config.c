/*
  Yixin Configuration File

  The file is written in simplified C programming language which supports the following features:

  * if else while break continue return
  * float int void
  * / + - % & ^ ~ | << >> ,
  * > < >= <= == != && || !
  * = ( ) , ; { } [ ]
   (only 1-dim array; variable length array is supported)

*/

/*
Global variables:

(Read/write)
  int info_caution_factor
  int info_hash_size
  int info_rule
  int info_show_detail
  int info_max_depth
  int info_max_node
  int info_thread_num
  int info_thread_split_depth
  int info_three_def

(Read only)
  int board_size

*/

void config_core()
{
    info_caution_factor = 1;
    info_hash_size = 1 << 1;    //must be power of 2

    info_thread_num = 1;
    info_thread_split_depth = 7;
    info_three_def = 1;
    info_pondering = 0;
}

