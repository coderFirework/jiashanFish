from flask import Blueprint
apiBp = Blueprint('api',__name__,static_url_path='', template_folder='templates',url_prefix="/api")

from . import views
from . import modifyFish