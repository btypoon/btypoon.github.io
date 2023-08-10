import http.server
import socketserver
import os
import webbrowser


PORT = 8000
webbrowser.open('http://localhost:8000')
web_dir = os.path.dirname(__file__)
os.chdir(web_dir)

Handler = http.server.SimpleHTTPRequestHandler
httpd = socketserver.TCPServer(("", PORT), Handler)
print("serving at port", PORT)
httpd.serve_forever()
