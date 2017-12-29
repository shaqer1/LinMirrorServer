
class Server {
	// Add any variables you need

private:
	int open_server_socket(int port);

public:
	void processRequest( int socket );
	void sendMessage(int fd, const char * user, const char * password, const char * args);
	void runServer(int port);
};
