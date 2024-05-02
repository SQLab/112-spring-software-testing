import angr, sys

proj = angr.Project("./login")
init_state = proj.factory.entry_state()
simgr = proj.factory.simgr(init_state)

def login_successful(state):
    return b'Login successful' in state.posix.dumps(sys.stdout.fileno())
def login_failed(state):
    return b'Login failed' in state.posix.dumps(sys.stdout.fileno())

simgr.explore(find=login_successful, avoid=login_failed)

solution = simgr.found[0]
print(solution.posix.dumps(sys.stdin.fileno()))