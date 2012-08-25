set :stages, %w(alpha beta production)
set :default_stage, "beta"

require 'capistrano/ext/multistage'
require 'bundler/capistrano'

set :project,     "NightSkyNetworkCalendarWebsite"

set :scm, :git
set :deploy_via, :remote_cache
set :git_enable_submodules, 1 # if you have vendored rails
set :branch, 'master'
set :git_shallow_clone, 1
set :scm_verbose, true

set :repository,  "git://github.com/wwvuillemot/NightSkyNetworkCalendar-website.git" #"git@github.com:wwvuillemot/NightSkyNetworkCalendarWebsite.git"

# Uncomment if we ever can use RVM with Dreamhost shared Passenger server
# For now just leave commented out
#$:.unshift(File.expand_path('./lib', ENV['rvm_path']))
#require "rvm/capistrano"
#set :rvm_ruby_string, '1.9.2@rails3'
#set :rvm_type, :user

# If you are using Passenger mod_rails uncomment this:
namespace :deploy do
  task :start do ; end
  task :stop do ; end
  task :restart, :roles => :app, :except => { :no_release => true } do
    run "#{try_sudo} touch #{File.join(current_path,'tmp','restart.txt')}"
  end
end

namespace :db do
  task :db_config, :except => { :no_release => true }, :role => :app do
    # run "rm -f #{release_path}/config/database.yml"
    # run "ln -s #{shared_path}/config/database.yml #{release_path}/config/database.yml"
    # run "rm -f #{release_path}/db/#{rails_env}.sqlite3"
    # run "ln -s #{shared_path}/db/#{rails_env}.sqlite3 #{release_path}/db/#{rails_env}.sqlite3"
    # run "rm -f #{release_path}/config/environments/#{rails_env}.rb"
    # run "ln -s #{shared_path}/config/environments/#{rails_env}.rb #{release_path}/config/environments/#{rails_env}.rb"
  end
end

after "deploy:finalize_update", "db:db_config"

default_run_options[:pty] = true
set :chmod755, "app config db lib public vendor script script/* public/disp*"
set :use_sudo, false