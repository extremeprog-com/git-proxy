# Git Proxy

![Git Proxy Service](git-proxy-sm.png) 

Easy access to private repos for automation services.

Git Proxy exists to organize a painful and secure access to private repos for automation services like Rancher, Jenkins, TeamCity, etc. View on Github

## Installation
You can install Git Proxy using Docker container `extremeprog/git-proxy`. When running container specify a private key to access to repo. Public key should be added to those services which you want to provide access to. We recommend to create an additional pair for these purposes.

```bash
$ docker run -d -it --restart=always --name=git-proxy \ 
-e PRIVATE_KEY="..." extremeprog/git-proxy 
```

### Rancher
If you use Rancher you can install Git Proxy service over our extremeprog custom cattle (until it is not added to the main Rancher cattle). Refer to this link https://github.com/extremeprog-com/rancher-catalog.
Within Rancher you can use it for connecting private cattles and installing services from your private repos.
