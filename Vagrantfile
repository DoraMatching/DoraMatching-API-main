# Vagranfile
# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|
    config.vm.box = "tranphuquy19/doramatching-api-ml"
    config.vm.box_version = "1.0.0"
    config.vm.network "private_network", ip: "172.16.10.107"
    config.vm.hostname = "ml.dora"
  
    config.vm.provider "virtualbox" do |vb|
        vb.name = "ml.dora"
        vb.cpus = 2
        vb.memory = "2048"
    end
end