Run Coq in your browser!
------------------------

*WARNING: This project is a proof of concept. If you are not a Coq
 expert expect trouble*

A [Coq](https://coq.inria.fr) Integrated Development Enviroment
running in the browser! Try it:

<https://x80.org/rhino-coq/>

The goal of this project is to open new UI/interaction possibilites,
and to improve the acessibility of the platform itself.

Coq 8.5 is compiled to javascript using `js_of_ocaml` compiler, no
servers or external programs are needed.

jsCoq runs fine in Chrome (>= 45) or Mozilla Firefox. We recommend
starting Chrome with:

```
google-chrome --js-flags="--stack-size=65536"
```

The IDE also runs in my old Galaxy Nexus.

* **Important:** Plugin loading is still very slow, so be patient at `Require Import` time.
* **Important:** Libraries are fully qualified, so you need to do `Require Import Coq.List.Lists", etc...

## API

The current release provides a `jsCoq` javascript object, so you can
embed Coq in your particular javascript application.

## Reporting Bugs ##

Feel free to use the issue tracker. Please include your
browser/OS/user-agent and command line options.

The code is far from stable now, but it should be possible to
contribute.  Any contribution or comment is really welcome!

## What is broken ##

* Loading ML modules is quite slow due to dynamic compilation.
* `vm_compute` and `native_compute` are not supported.
* There may be threading and performance problems.

## Contact & Sponsorship ##
![FEEVER Logo](/images/feever-logo.png?raw=true "Feever Logo")
jsCoq has been make possible thanks to funding by the [FEEVER](http://feever.fr) project.

Contact: Emilio J. Gallego Arias `e+jscoq at x80.org`.

## How to Install/Build ##

* _warning_: The build process takes more than 8GiB of RAM.
* First, you need a dual 32/64 bits Ocaml toolchain. Get a
  recent opam and a multiarch gcc (`gcc-multilib` package in
  Debian/Ubuntu), then run:

  ````
$ cp -a opam/4.02.3+32bit ~/.opam/compilers/4.02.3/
$ git clone https://github.com/ocsigen/js_of_ocaml.git ~/external/js_of_ocaml
$ ./toolchain-setup.sh
  ````

  and it should do the trick.

  If your copy of js_of_ocaml is in a different location, edit the setup
  script and set the JS_OF_OCAML_DIR variable appropriately. Tweaking the NJOBS
  variable may be necessary too (64 jobs by default).

* Second, you need to build Coq trunk/master:

  ````
$ git clone https://github.com/coq/coq.git ~/external/coq-git
$ cd ~/external/coq-git
$ opam switch 4.02.3+32bit
$ eval `opam config env`
$ ./configure -local -natdynlink no -coqide no -no-native-compiler
$ make               # use -j N as desired
  ````

  If you want to use a different location for Coq, edit the `COQDIR` variable in JsCoq's `Makefile`.

  We recommend to edit $(COQDIR)/theories/Init/Prelude.v and comment
  out the extraction and recdef plugins, they take long time to
  compile.
* You may want to select what libraries get
  included. `coq-tools/dftlibs.ml` allows you to do that.

* Finally:

  ````
$ ./build.sh
  ````

  should build jscoq. The script tries to manage the pain of the 32/64
  bit switch, you can also use make if you know what you are doing.

* To run jscoq in locally you may need to start your browser as:

  ````
$ google-chrome-beta --allow-file-access-from-files --js-flags="--stack-size=65536" index.html
  ````

* Profit!
* Extra/Experimental: ssreflect.

  Get the ssreflect distribution at
  `git://scm.gforge.inria.fr/coq-contribs/ssreflect`. Then build with:

  ```
$ opam switch 4.02.3+32bit
$ eval `opam config env`
$ export PATH=~/external/coq-git/bin:$PATH
$ coq_makefile -f Make > Makefile
$ make byte
  ```
