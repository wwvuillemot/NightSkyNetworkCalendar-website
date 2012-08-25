set :applicationdir,  "/home/wwvuillemot/sas.wardosworld.com"
set :user,            "wwvuillemot"
set :domain,          "nsn-calendar.org"
set :rails_env,       "production"

set :application, domain
role :web, domain
role :app, domain
role :db,  domain, :primary => true

# non-interactive, non-login SSH to dreamhost does not have PATH so we need to add it
default_environment['PATH'] = '/usr/lib/ruby/gems/1.8/bin/:$PATH'

set :deploy_to,  applicationdir
set :deploy_via, :export

