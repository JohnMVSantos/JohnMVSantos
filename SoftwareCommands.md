# Software Commands

The following shows helpful commands in software.

Git
========

* Clone: `git clone <git path>`
* Branch: `git checkout -b <new branch name>`
* Push New Branch: `git push origin <new branch name>`
* Push New Branch: `git push --set-upstream origin <new branch name>`
* Tag: `git tag -a -m "Version 1.0.0" 1.0.0`
       `git push --tags`
* Track file: `git lfs track <path to the file>`

SSH Git Access
==============
1. Add your key to GitHub `cat ~/.ssh/id_rsa.pub`
2. Add your SSH key to the SSH agent `eval "$(ssh-agent -s)"`
3. Add your private key: `ssh-add ~/.ssh/id_rsa`
4. Ensure your Git remote uses SSH (not HTTPS) `git remote -v`
5. If it shows HTTPS: `git remote set-url origin git@github.com:<your-username>/<your-repo>.git`
6. Test SSH login to GitHub `ssh -T git@github.com`
7. Should now be able to `git push`
	 
GITLFS
=========
* `sudo apt install git-lfs`
* `git lfs install`
* `git lfs track <path to file>`
* .gitattributes file `<path to file> filter=lfs diff=lfs merge=lfs -text`
* `git add .gitattributes`
* `git commit -m "Add .gitattributes for LFS files"`
* `git push origin <branch name>`

Git Private Fork
=================
1) git clone <git path>
2) See all active remotes : git remote -v
3) Rename origin to maintain clarity : git rename origin <original source>
4) Add new origin for the changes : git remote add <current source> <git path>
5) Push new remote origin : git push <current source>
6) Keep up to date with the original source : git pull <original source>
7) Push remote branch : git push <current source> <branch name>

DVC
====
* `dvc pull`
* `dvc push`
* `dvc add`

DVC + Git
=========
* After file updates: `dvc add <file(s)> (or the specific files)`
* Push updates: `dvc push`
* --You'll notice changes from `git status` that the various *.dvc files have changed--
* `git commit -a -m "message"`
* `git push`

AWS
====
* Install AWSCli: https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html
* Setup AWS https://wellarchitectedlabs.com/common/documentation/aws_credentials/

Linux
========
* Update: `sudo apt update`
* Upgrade: `sudo apt upgrade`
* Ubuntu-version: `lsb_release -a`
* OS: `uname -a`

* Adding to PATH variable: 
    * `export PATH="/path/to/app/executable/file/directory:$PATH"`
    * path+="/path/to/app/executable/file/directory"
Symbolic-link executable(s) to a bin directory: 
    * `ln -s "/path/to/app/executable/file/" ~/bin` [-s parameter allows soft link (default = hard link)]

* Load library: `LD_PRELOAD=<path to .so>`
* Change file extensions: `for file in *.tx; do mv -- "$file" "$(basename -- "$file" .tx).txt";`
* apt-resource: `sudo nano /etc/apt/sources.list` => deb [trusted=yes] https://download.eclipse.org/zenoh/debian-repo/ (Example Zenoh repo)
* Modify Backend Visual Toolkit: `export WGPU_BACKEND=vulkan`

* Run device on performance mode:
    * `echo performance | sudo tee /sys/devices/system/cpu/cpufreq/policy0/scaling_governor`
    * `cat /sys/devices/system/cpu/cpufreq/policy0/scaling_governor`

* Disable all services: `sudo systemctl set-default multi-user`
* List all camera formats: `v4l2-ctl --device /dev/video<x> --list-formats`

Jetson
=======
* No power saving
* `sudo nvpmodel -m <n>` => 0 for 15W and 2 for MAXN, 3 for 7W
* `sudo jetson_clocks`

ONNX to TensoRT: `/usr/src/tensorrt/bin/trtexec onnx=<model.onnx> --saveEngine=<model.trt> --fp16`

WSL
========
WSL automatically grows virtual disk, fix with the command below.
`optimize-vhd -Path C:\Users\<YourUserName>\AppData\Local\Packages\<UbuntuPackage>\LocalState\ext4.vhdx -Mode Full`
 
Ensure to run powershell as administrator to run the command and the UbuntuPackage is typically `CanonicalGroupLimited.Ubuntu_79rhkp1fndgsc`

VSCode
=======
code .

VIM
=======
* vi <file>
* edit file: INSERT
* escape edit: ESC
* save: :wq!

Nvidia
=======
* `nvidia-smi`
* `Kill GPU process: kill -9 <pid>`
* `ps -aux | grep python`
* `killall -9 python3`

CMake Process
==============
* CMake uses a configuration file called CMakeLists.txt
* Define your project in CMakeLists.txt
* Run CMake to create the Makefile
* Build your project using Make
* Add code, fix things, etc. then jump to step c.
* If you add new .c files or alter the dependencies then jump to step a.

Python Virtual Environment
==========================
1) `python -m venv <environment path>`
2) `virtualenv -p python3.10 <environment path>`
linux : `source <environment path>/bin/activate`
windows : `<environment path>/lib/activate`

Python Sphinx Documentations
=============================
* `mkdir docs`
* `cd docs`
* `pip install sphinx`
* `pip install sphinx-rtd-theme`
* sphinx-quickstart (Keep defaults)
* `cd ..`
* `sphinx-apidoc -o docs .`
* `cd docs`
* `make clean`
* `make html`

Python Setuptools and Packaging
================================
* Ensure proper version and repository is tagged: `git describe --tags --always`
* `pip install wheel`
* `python setup.py sdist bdist_wheel`
* Upload to PyPi: `twine upload dist/*`

Autopep8
=========
* `autopep8 --in-place --aggressive <path to the file>`

PyLint
=======
* `pip install pylin`
* `pylint --generate-rcfile > .pylintrc`

Rust
=====
* Environment: . "$HOME/.cargo/env" 
* Update: `rustup update`
* Uninstall: `rustup self uninstall`
* Compile: `rustc <path to file.rs>`
* Project: `cargo new <project name> --lib`
* Format: `rustfmt <path to rs file>`

Cross Compilation to ARM64
--------------------------
* `sudo apt update && apt upgrade`
* `sudo apt install build-essential`
* `rustup target add aarch64-unknown-linux-gnu`
* `sudo apt install gcc-aarch64-linux-gnu g++-aarch64-linux-gnu`
* `rustup toolchain install stable`

!!!
RUSTFLAGS="-C linker=aarch64-linux-gnu-gcc" cargo build --target aarch64-unknown-linux-gnu --release
!!!

Rust Upload Crate
==================
* `cargo login`
* `cargo test`
* `cargo doc --open`
* `cargo publish --dry-run`
* `cargo publish`

GStreamer
=========
* Model Inference for Video Files

`gst-launch-1.0 filesrc location=Test_Video_IP_200_Split_1.mp4 ! video/x-raw,width=640,height=480 ! decodebin ! videoconvert ! tee name=camera ! queue ! deepviewrt model=modelpack-people-320x320.rtm ! boxdecode thr=0.02 ! overlay. camera. ! queue ! boxoverlay name=overlay ! autovideosink`

`gst-launch-1.0 filesrc location=Test_Video_IP_200_Split_1.mp4 ! video/x-raw,width=640,height=480 ! decodebin ! tee name=camera  camera. ! queue ! videoconvert ! deepviewrt model=modelpack-people-320x320.rtm ! boxdecode thr =0.02 ! overlay. camera. ! queue ! boxoverlay name=overlay ! videoconvert ! autovideosink`

`gst-launch-1.0 filesrc location=Test_Video_IP_200_Split_1.mp4 ! qtdemux name=d d.video_0 ! queue ! h264parse ! vpudec ! tee name=camera ! queue leaky=2 ! deepviewrt model=modelpack-people-320x320.rtm ! boxdecode thr=0.01 ! overlay. camera. ! queue ! boxoverlay name=overlay ! queue ! autovideosink sync=false`

* Reading Camera

`gst-launch-1.0 v4l2src device=/dev/video0 ! videoconvert! videoscale ! video/x-raw, width=2592, height=600 ! autovideosink`

FFMPEG
======
Convert MP4 to GIF
1. `ffmpeg -i .\WindowsPC.mp4 -vf "fps=20,scale=1280:-1:flags=lanczos,palettegen" palette.png
2. `ffmpeg -i .\WindowsPC.mp4 -i palette.png -filter_complex "[0:v]fps=20,scale=1280:-1:flags=lanczos[v];[v][1:v]paletteuse" .\WindowsPC.gif`

Model Conversions
=================
`C:\nxp\eIQ_Toolkit_v1.16.0\bin\neutron-converter\MCU_SDK_25.06.00+Linux_6.12.20_2.0.0\neutron-converter.exe  --input yolov8l-seg_int8.tflite --target imx95`