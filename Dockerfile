FROM ruby:2.6
RUN apt-get update -qq && apt-get install -y nodejs
RUN mkdir /b33rtime
WORKDIR /b33rtime
COPY Gemfile /b33rtime/Gemfile
COPY Gemfile.lock /b33rtime/Gemfile.lock
RUN bundle install
COPY . /b33rtime

# Add a script to be executed every time the container starts.
COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]
EXPOSE 3000

# Start the main process.
CMD ["rails", "server", "-b", "0.0.0.0"]
