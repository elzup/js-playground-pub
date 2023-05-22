import json
import sre_yield

if __name__ == '__main__':

  # abcdefghijklmnopqrstuvwxyz
  #  bcd fgh jklmn pqrst vwxyz
  # regex = "[bcdfghjklmnpqrstvwxyz][aiueo]"
  # names = sorted(list(sre_yield.AllStrings(regex)))
  # print(len(names))
  # print("|".join(names))

  # |--|--|bi|bo|bu
  # |da|de|--|do|--
  # |ga|ge|gi|go|gu
  # |ha|he|hi|ho|--
  # |ja|je|--|--|--
  # |ka|ke|ki|ko|ku
  # |ma|me|mi|mo|mu
  # |na|ne|ni|no|nu
  # |pa|pe|pi|po|pu
  # |sa|se|--|so|su
  # |ta|te|--|to|--
  # |wa|--|wi|wo|--
  # |ya|--|--|yo|yu
  # |za|ze|zi|zo|zu

  # bi|bo|bu|da|de|do|ga|ge|gi|go|gu|ha|he|hi|ho|ja|je|ka|ke|ki|ko|ku|ma|me|mi|mo|mu|na|ne|ni|no|nu|pa|pe|pi|po|pu|sa|se|so|su|ta|te|to|wa|wi|wo|ya|yo|yu|za|ze|zi|zo|zu

  # b2
  # |--|--|--|bo|--
  # |--|--|--|do|--
  # |ga|ge|--|go|--
  # |ha|--|--|--|--
  # |ja|je|--|--|--
  # |--|ke|ki|--|ku
  # |ma|me|mi|mo|mu
  # |na|ne|ni|no|--
  # |pa|pe|pi|po|--
  # |sa|se|--|--|--
  # |ta|te|--|to|--
  # |wa|--|wi|wo|--
  # |ya|--|--|yo|yu
  # |za|ze|--|zo|--


  # flat
  # |ma|me|--|mo|mu
  # |na|ne|--|no|nu
  # |sa|se|--|so|su
  # |wa|--|--|--|--
  # |za|ze|--|zo|zu

  # ma|me|mo|mu|na|ne|no|sa|se|so|su|wa|za|ze|zo|zu
  # ma|me|mo|mu|na|ne|no|sa|se|so|su|za|ze|zo|zu

  # head
  # |ba|be|bi|bo|bu
  # |da|de|di|do|du
  # |fa|fe|fi|fo|fu
  # |ha|he|hi|ho|hu
  # |ka|ke|ki|ko|ku
  # |la|le|li|lo|lu
  # |ta|te|ti|to|tu

  # drop
  # |ga|--|gu|ge|go
  # |pa|--|pu|pe|po
  # |ya|--|yu|--|yo

  # rbon = "(ga|gu|ge|go|pa|pu|pe|po|ya|yu|yo)"
  # r2 = "a{rbon}{rbon}n".format(rbon=rbon)
  # rbon = ""
  # r2 = "a(ga|gu|ge|go|ya|yu|yo)(pa|pe|po)n"

  rbon = "(bo|do|ga|ge|go|ha|ja|je|ke|ki|ku|ma|me|mi|mo|mu|na|ne|ni|no|pa|pe|pi|po|sa|se|ta|te|to|wa|wi|wo|ya|yo|yu|za|ze|zo)"
  r2 = "a{rbon}{rbon}n".format(rbon=rbon)
  names = list(sre_yield.AllStrings(r2))
  print(json.dumps({"names": ",".join(names)}, indent=2))
